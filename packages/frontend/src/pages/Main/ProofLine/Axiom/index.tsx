import { useMemo, useState } from 'react';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';

const Axiom: React.FC = () => {
  const [axiomSelected, setAxiomSelected] = useState(0);

  const options = useMemo(() => {
    const axiomsNames = [
      'FirstOfImplication',
      'SecondOfImplication',
      'FirstOfConjuction',
      'SecondOfConjuction',
      'ThirdOfConjuction',
      'FirstOfDisjunction',
      'SecondOfDisjunction',
      'ThirdOfDisjunction',
      'FirstOfNegation',
      'SecondOfNegation',
    ];

    return Array.from({ length: 10 }, (_i, index) => ({
      label: axiomsNames[index],
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
        onChange={(value, _i) => {
          setAxiomSelected(value?.value);
        }}
      />
      <Input icon={() => <span>P:</span>} name="p" />
      <Input icon={() => <span>Q:</span>} name="q" />
      {(axiomSelected === 2 || axiomSelected === 8) && (
        <Input icon={() => <span>R:</span>} name="r" />
      )}
    </>
  );
};

export default Axiom;
