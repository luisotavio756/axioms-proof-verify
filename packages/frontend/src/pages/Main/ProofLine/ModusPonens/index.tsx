import { useMemo, useState } from 'react';
import Select from '../../../../components/Select';

interface IModusPonensProps {
  totalFormulas: number;
}

const ModusPonens: React.FC<IModusPonensProps> = ({ totalFormulas }) => {
  const [baseFormula, setBaseFormula] = useState(0);

  const options = useMemo(() => {
    return Array.from({ length: totalFormulas - 1 }, (_i, index) => ({
      label: index + 1,
      value: index + 1,
    })).filter(item => item.value !== baseFormula);
  }, [totalFormulas, baseFormula]);

  return (
    <>
      <Select
        name="formulasToMP[0]"
        placeholder="Base Formula"
        options={options}
        onChange={(value, _i) => {
          setBaseFormula(value?.value);
        }}
      />
      <Select
        name="formulasToMP[1]"
        placeholder="To Compare Formula"
        options={options}
      />
    </>
  );
};

export default ModusPonens;
