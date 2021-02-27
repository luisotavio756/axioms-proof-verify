import { FormHandles } from '@unform/core';
import { useCallback, useRef, useState } from 'react';
import { FiArrowRight, FiCheckCircle, FiX } from 'react-icons/fi';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Axiom from './Axiom';
import ModusPonens from './ModusPonens';

import { Container, Form } from './styles';

interface IProofLineProps {
  number: number;
  removeItem(): void;
  isLast: boolean;
}

const ProofLine: React.FC<IProofLineProps> = ({
  number,
  isLast,
  removeItem,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [selectedType, setSelectedType] = useState('');

  const addType = useCallback(value => {
    setSelectedType(value);
  }, []);

  const renderType = useCallback(() => {
    switch (selectedType) {
      case 'proposition':
        return <></>;
      case 'modus_ponens':
        return <ModusPonens />;
      case 'axiom':
        return <Axiom />;
      default:
        return <></>;
    }
  }, [selectedType]);

  return (
    <Form
      ref={formRef}
      onSubmit={() => {
        alert('ok');
      }}
    >
      <Container
        style={{
          gridTemplateColumns: '2% 26% 10% 15% 15% 15% 15% 2%',
        }}
      >
        <div className="number-of-count">
          <span>{number}:</span>
        </div>
        <Input icon={FiArrowRight} name="formula" />
        <select
          name="proof-type"
          defaultValue="0"
          onChange={e => addType(e.target.value)}
        >
          <option disabled value="0">
            Type
          </option>
          <option value="proposition">Proposition</option>
          <option value="axiom">Axiom</option>
          <option value="modus_ponens">M.P</option>
        </select>
        {renderType()}
        <div className="actions">
          <Button type="button" className="check-button">
            <FiCheckCircle /> Check
          </Button>
          {isLast && (
            <button
              type="button"
              className="remove-button"
              onClick={() => removeItem()}
            >
              <FiX />
            </button>
          )}
        </div>
      </Container>
    </Form>
  );
};

export default ProofLine;
