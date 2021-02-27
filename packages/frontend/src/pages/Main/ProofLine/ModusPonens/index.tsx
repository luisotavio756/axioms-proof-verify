import { useMemo, useState } from 'react';
import Select from '../../../../components/Select';
import { useFormulas } from '../../../../hooks/formulas';

const ModusPonens: React.FC = () => {
  const [baseFormula, setBaseFormula] = useState(0);
  const { formulas } = useFormulas();

  const options = useMemo(() => {
    return Array.from({ length: formulas.length - 1 }, (_i, index) => ({
      label: index + 1,
      value: index + 1,
    })).filter(item => item.value !== baseFormula);
  }, [formulas, baseFormula]);

  return (
    <>
      <Select
        name="formulaToMP1"
        placeholder="Base Formula"
        options={options}
        onChange={(value, _i) => {
          setBaseFormula(value?.value);
        }}
        isSearchable={false}
      />
      <Select
        name="formulaToMP2"
        placeholder="To Compare Formula"
        options={options}
        isSearchable={false}
      />
    </>
  );
};

export default ModusPonens;
