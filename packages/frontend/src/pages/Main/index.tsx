import { FiMoon, FiPlus, FiSun, FiTrash } from 'react-icons/fi';
import { Title, Container } from './styles';
import Button from '../../components/Button';
import { useTheme } from '../../hooks/theme';
import ProofLine from './ProofLine';
import { useFormulas } from '../../hooks/formulas';

const Main: React.FC = () => {
  const { toggleTheme, theme } = useTheme();
  const { formulas, clearFormulas, incrementFormulas } = useFormulas();

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
            <ProofLine key={item.position} position={item.position} />
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
