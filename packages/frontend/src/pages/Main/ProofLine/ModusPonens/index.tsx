const ModusPonens: React.FC = () => {
  return (
    <>
      <select name="base-formula" defaultValue="0">
        <option disabled value="0">
          Base Formula
        </option>
        <option value="proposition">1</option>
        <option value="axiom">2</option>
        <option value="modus_ponens">3</option>
      </select>
      <select name="tocompare-formula" defaultValue="0">
        <option disabled value="0">
          To Compare Formula
        </option>
        <option value="proposition">1</option>
        <option value="axiom">2</option>
        <option value="modus_ponens">3</option>
      </select>
    </>
  );
};

export default ModusPonens;
