import {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react';

interface IFormula {
  position: number;
  isTruthy: boolean;
}

interface IFormulasContextData {
  formulas: IFormula[];
  incrementFormulas(): void;
  updateProof(position: number, isTruthy: boolean): void;
  lastFormulaIsTruthy: boolean;
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

  const updateProof = useCallback((position: number, isTruthy: boolean) => {
    setFormulas(state => {
      return state.map(item =>
        item.position === position ? { position, isTruthy } : item,
      );
    });
  }, []);

  const lastFormulaIsTruthy = useMemo(
    () => formulas[formulas.length - 1].isTruthy,
    [formulas],
  );

  return (
    <FormulasContext.Provider
      value={{ formulas, incrementFormulas, updateProof, lastFormulaIsTruthy }}
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
