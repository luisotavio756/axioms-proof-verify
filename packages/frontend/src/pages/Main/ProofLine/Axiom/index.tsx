import { useMemo } from 'react';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';

const Axiom: React.FC = () => {
  const options = useMemo(() => {
    return Array.from({ length: 10 }, (_i, index) => ({
      label: index + 1,
      value: index + 1,
    }));
  }, []);

  return (
    <>
      <Select
        name="axiomType"
        isSearchable={false}
        options={options}
        placeholder="Axiom Type"
      />
      <Input icon={() => <span>P:</span>} name="p" />
      <Input icon={() => <span>Q:</span>} name="q" />
      <Input icon={() => <span>R:</span>} name="r" />
    </>
  );
};

export default Axiom;
