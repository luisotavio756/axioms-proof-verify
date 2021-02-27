import { FormHandles } from '@unform/core';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  FiAlertCircle,
  FiArrowRight,
  FiCheckCircle,
  FiX,
} from 'react-icons/fi';
import * as Yup from 'yup';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import { useToast } from '../../../hooks/toast';
import getValidationErrors from '../../../utils/getValidationErrors';
import Axiom from './Axiom';
import ModusPonens from './ModusPonens';

import { Container, Form } from './styles';

interface IProofLineProps {
  number: number;
  removeItem(): void;
  isLast: boolean;
  totalFormulas: number;
}

interface IMessage {
  type: 'error' | 'success';
  description: string;
}

const ProofLine: React.FC<IProofLineProps> = ({
  number,
  isLast,
  totalFormulas,
  removeItem,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [selectedType, setSelectedType] = useState('');
  const { addToast } = useToast();
  const [message, setMessage] = useState<IMessage>({} as IMessage);

  const addType = useCallback(selected => {
    const { value } = selected;

    setSelectedType(value);
  }, []);

  const renderType = useCallback(() => {
    switch (selectedType) {
      case 'proposition':
        return <></>;
      case 'modus_ponens':
        return <ModusPonens totalFormulas={totalFormulas} />;
      case 'axiom':
        return <Axiom />;
      default:
        return <></>;
    }
  }, [selectedType, totalFormulas]);

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        console.log(data);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          formula: Yup.string().required('Formula is required'),
          'proof-type': Yup.string().required('Proof Type is required'),
          p: Yup.string().when('proof-type', {
            is: 'axiom',
            then: Yup.string().required('The proposal P is required'),
          }),
          q: Yup.string().when('proof-type', {
            is: 'axiom',
            then: Yup.string().required('The proposal Q is required'),
          }),
          formulaToMP1: Yup.number().when('proof-type', {
            is: 'modus_ponens',
            then: Yup.number().required(),
          }),
          formulaToMP2: Yup.number().when('proof-type', {
            is: 'modus_ponens',
            then: Yup.number().required(),
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setMessage({
          type: 'success',
          description: 'The proof is valid !',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          setMessage({
            type: 'error',
            description: 'Please, verify the fields !',
          });

          return;
        }

        setMessage({
          type: 'error',
          description: 'The proof is not valid !',
        });

        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente',
        });
      }
    },
    [addToast],
  );

  const typeOptions = useMemo(() => {
    const options = [
      { value: 'proposition', label: 'Proposition' },
      { value: 'axiom', label: 'Axiom' },
    ];

    if (totalFormulas > 2 && number === totalFormulas) {
      options.push({ value: 'modus_ponens', label: 'M.P' });
    }

    return options;
  }, [totalFormulas, number]);

  const gridTemplateColumns = useMemo(() => {
    switch (selectedType) {
      case 'proposition':
        return '2% 20% 7% 5% 2';
      case 'modus_ponens':
        return '2% 20% 7% 8% 13% 13% 5% 2%';
      case 'axiom':
        return '2% 20% 7% 7% 12% 12% 12% 5% 2%';
      default:
        return '2% 20% 7% 2%';
    }
  }, [selectedType]);

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container
        style={{
          gridTemplateColumns,
        }}
      >
        <div className="number-of-count">
          <span>{number}:</span>
        </div>
        <Input icon={FiArrowRight} name="formula" />
        <Select
          name="proof-type"
          options={typeOptions}
          onChange={addType}
          placeholder="Type"
          isSearchable={false}
        />
        {renderType()}
        <div className="actions">
          <Button type="submit" className="check-button">
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
        {Object.keys(message).length > 0 && (
          <p className={message.type}>
            {message.description}{' '}
            {message.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
          </p>
        )}
      </Container>
    </Form>
  );
};

export default ProofLine;
