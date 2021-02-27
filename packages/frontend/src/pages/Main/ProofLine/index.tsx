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
import api from '../../../services/api';

import { Container, Form } from './styles';
import { useFormulas } from '../../../hooks/formulas';

interface IProofLineProps {
  position: number;
}

interface IMessage {
  type: 'error' | 'success';
  description: string;
}

interface IProofData {
  formula: string;
  type: string;
  axiomType?: number;
  p?: string;
  q?: string;
  r?: string;
  formulaToMP1?: string;
  formulaToMP2?: string;
}

const ProofLine: React.FC<IProofLineProps> = ({ position }) => {
  const formRef = useRef<FormHandles>(null);
  const [selectedType, setSelectedType] = useState('');
  const { addToast } = useToast();
  const { formulas, removeFormula, updateProof } = useFormulas();
  const [message, setMessage] = useState<IMessage>({} as IMessage);

  const isLast = useMemo(() => {
    return position === formulas.length;
  }, [position, formulas]);

  const addType = useCallback(selected => {
    const { value } = selected;

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

  const handleSubmit = useCallback(
    async (data: IProofData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          formula: Yup.string().required('Formula is required'),
          type: Yup.string().required('Proof Type is required'),
          axiomType: Yup.number().when('type', {
            is: 'axiom',
            then: Yup.number().required('The axiom type is required'),
          }),
          p: Yup.string().when('type', {
            is: 'axiom',
            then: Yup.string().required('The proposal P is required'),
          }),
          q: Yup.string().when('type', {
            is: 'axiom',
            then: Yup.string().required('The proposal Q is required'),
          }),
          r: Yup.string().when('axiomType', {
            is: 2 || 8,
            then: Yup.string().required('The proposal R is required'),
          }),
          formulaToMP1: Yup.number().when('type', {
            is: 'modus_ponens',
            then: Yup.number().required(),
          }),
          formulaToMP2: Yup.number().when('type', {
            is: 'modus_ponens',
            then: Yup.number().required(),
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          formula,
          type,
          p,
          q,
          r,
          axiomType,
          formulaToMP1,
          formulaToMP2,
        } = data;

        const parsedData = {
          formula,
          type,
          ...(type === 'axiom'
            ? {
                axiomType,
                atoms: {
                  p,
                  q,
                  ...(axiomType === 2 || axiomType === 8 ? { r } : {}),
                },
              }
            : {}),
          ...(type === 'modus_ponens'
            ? {
                formulasToMP: [formulaToMP1, formulaToMP2],
              }
            : {}),
        };

        const response = await api.post('/resolver', parsedData);

        if (response.data) {
          setMessage({
            type: 'success',
            description: 'The proof is valid !',
          });

          updateProof(position, true);
        } else {
          throw Error();
        }
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
          title: 'Proof error',
          description: 'Has a error in the proof line. Please, verify again.',
        });
      }
    },
    [addToast, updateProof, position],
  );

  const typeOptions = useMemo(() => {
    const options = [
      { value: 'proposition', label: 'Proposition' },
      { value: 'axiom', label: 'Axiom' },
    ];

    if (formulas.length > 2 && position === formulas.length) {
      options.push({ value: 'modus_ponens', label: 'M.P' });
    }

    return options;
  }, [formulas, position]);

  const gridTemplateColumns = useMemo(() => {
    switch (selectedType) {
      case 'proposition':
        return '2% 20% 7% 5% 2';
      case 'modus_ponens':
        return '2% 20% 7% 13% 13% 13% 5% 2%';
      case 'axiom':
        return '2% 20% 7% 10% 12% 12% 12% 5% 2%';
      default:
        return '2% 20% 7% 2%';
    }
  }, [selectedType]);

  console.log(
    formulas.length > 1,
    !formulas[position - 2]?.isTruthy,
    position !== 1,
  );

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container
        style={{
          gridTemplateColumns,
        }}
      >
        <div className="number-of-count">
          <span>{position}:</span>
        </div>
        <Input icon={FiArrowRight} name="formula" />
        <Select
          name="type"
          options={typeOptions}
          onChange={addType}
          placeholder="Type"
          isSearchable={false}
        />
        {renderType()}
        <div className="actions">
          <Button
            type="submit"
            className="check-button"
            disabled={
              formulas.length > 1 &&
              !formulas[position - 2]?.isTruthy &&
              position !== 1
            }
          >
            <FiCheckCircle /> Check
          </Button>
          {isLast && (
            <button
              type="button"
              className="remove-button"
              onClick={() => removeFormula()}
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
