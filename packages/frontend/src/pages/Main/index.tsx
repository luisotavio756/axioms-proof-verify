import { FiMoon, FiPlus, FiSun, FiTrash } from 'react-icons/fi';
import { useCallback, useState } from 'react';
import { Title, Container } from './styles';
import Button from '../../components/Button';
import { useTheme } from '../../hooks/theme';
import ProofLine from './ProofLine';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

const Main: React.FC = () => {
  const { toggleTheme, theme } = useTheme();
  const [formulas, setFormulas] = useState<number[]>([]);
  const { addToast } = useToast();

  const incrementFormulas = useCallback(() => {
    setFormulas(state => {
      if (state.length) {
        const lastFormula = state[state.length - 1];

        return [...state, lastFormula + 1];
      }

      return [1];
    });
  }, []);

  const removeFormula = useCallback(() => {
    setFormulas(state => {
      return state.filter(item => item !== state.length);
    });
  }, []);

  const clearFormulas = useCallback(async () => {
    try {
      await api.get('/formulas/clear');

      setFormulas([]);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Error',
        description: 'Happen a error when try clear proofs',
      });
    }
  }, [addToast]);

  return (
    <Container data-testid="container">
      <div className="container-title">
        <button
          className={`button-switch-theme switch-to-${theme}`}
          type="button"
          onClick={toggleTheme}
        >
          {theme === 'light' ? (
            <>
              <FiMoon /> Dark mode
            </>
          ) : (
            <>
              <FiSun /> Light mode
            </>
          )}
        </button>
        <Title>Axioms Proof Checker</Title>
      </div>
      <div className="description">
        <h4>Alphabetic:</h4>
        <ul>
          <li>
            Implication: <span>{'->'}</span>
          </li>
          <li>
            Negation: <span>¬</span>
          </li>
          <li>
            Conjunction: <span>^</span>
          </li>
          <li>
            Disjunction: <span>v</span>
          </li>
        </ul>
        <p>OBS: Please, use one tab space</p>
      </div>
      <div className="formulas">
        {formulas.length > 0 &&
          formulas.map(item => (
            <ProofLine
              key={item}
              number={item}
              removeItem={removeFormula}
              isLast={item === formulas.length}
              totalFormulas={formulas.length}
            />
          ))}
      </div>
      <div className="button-actions">
        <Button type="button" className="errase-button" onClick={clearFormulas}>
          <FiTrash /> Clear Proof
        </Button>
        <Button
          type="button"
          className="add-line-button"
          onClick={incrementFormulas}
        >
          <FiPlus /> Add Line
        </Button>
      </div>
    </Container>
  );
};

export default Main;
