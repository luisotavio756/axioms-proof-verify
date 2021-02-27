import {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react';
import api from '../services/api';
import { useToast } from './toast';

interface IFormula {
  position: number;
  isTruthy: boolean;
}

interface IFormulasContextData {
  formulas: IFormula[];
  lastFormulaIsTruthy: boolean;
  incrementFormulas(): void;
  updateProof(position: number, isTruthy: boolean): void;
  removeFormula(): void;
  clearFormulas(): Promise<void>;
}

const FormulasContext = createContext({} as IFormulasContextData);

const FormulasProvider: React.FC = ({ children }) => {
  const [formulas, setFormulas] = useState<IFormula[]>([]);

  const incrementFormulas = useCallback(() => {
    setFormulas(state => {
      if (state.length) {
        const lastFormula = state[state.length - 1].position;

        return [...state, { position: lastFormula + 1, isTruthy: false }];
      }

      return [{ position: 1, isTruthy: false }];
    });
  }, []);

  const removeFormula = useCallback(() => {
    setFormulas(state => {
      return state.filter(item => item.position !== state.length);
    });
  }, []);

  const updateProof = useCallback((position: number, isTruthy: boolean) => {
    setFormulas(state => {
      return state.map(item =>
        item.position === position ? { position, isTruthy } : item,
      );
    });
  }, []);

  const { addToast } = useToast();

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

  const lastFormulaIsTruthy = useMemo(
    () => formulas.length > 0 && formulas[formulas.length - 1].isTruthy,
    [formulas],
  );

  return (
    <FormulasContext.Provider
      value={{
        formulas,
        lastFormulaIsTruthy,
        incrementFormulas,
        updateProof,
        removeFormula,
        clearFormulas,
      }}
    >
      {children}
    </FormulasContext.Provider>
  );
};

function useFormulas(): IFormulasContextData {
  const context = useContext(FormulasContext);

  if (!context) {
    throw new Error('useFormulas muste be user within as FormulasProvider');
  }

  return context;
}

export { FormulasProvider, useFormulas };
