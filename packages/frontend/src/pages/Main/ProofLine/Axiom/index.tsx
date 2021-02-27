import Input from '../../../../components/Input';

const Axiom: React.FC = () => {
  return (
    <>
      <Input icon={() => <span>P:</span>} name="p" />
      <Input icon={() => <span>Q:</span>} name="q" />
      <Input icon={() => <span>R:</span>} name="r" />
    </>
  );
};

export default Axiom;
