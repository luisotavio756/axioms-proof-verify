import { FormHandles } from '@unform/core';
import { useCallback, useRef, useState } from 'react';
import { FiArrowRight, FiCheckCircle, FiX } from 'react-icons/fi';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import Axiom from './Axiom';
import ModusPonens from './ModusPonens';

import { Container, Form } from './styles';

interface IProofLineProps {
  number: number;
  removeItem(): void;
  isLast: boolean;
  totalFormulas: number;
}

const ProofLine: React.FC<IProofLineProps> = ({
  number,
  isLast,
  totalFormulas,
  removeItem,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [selectedType, setSelectedType] = useState('');

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
  }, [selectedType]);

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        console.log(data, selectedType);

        // formRef.current?.setErrors({});
        // const schema = Yup.object().shape({
        //   email: Yup.string()
        //     .required('Email obrigatório')
        //     .email('Digite um email válido'),
        // });
        // await schema.validate(data, {
        //   abortEarly: false,
        // });
        // await api.post('/password/forgot', {
        //   email: data.email,
        // });
        // addToast({
        //   type: 'success',
        //   title: 'E-mail de recuperação enviado',
        //   description:
        //     'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada',
        // });
        // history.push('/dashboard');
      } catch (error) {
        // if (error instanceof Yup.ValidationError) {
        //   const errors = getValidationErrors(error);
        //   formRef.current?.setErrors(errors);
        //   return;
        // }
        // addToast({
        //   type: 'error',
        //   title: 'Erro na recuperação de senha',
        //   description:
        //     'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente',
        // });
      }
    },
    [selectedType],
  );

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container
        style={{
          gridTemplateColumns: '2% 26% 10% 15% 15% 15% 15% 2%',
        }}
      >
        <div className="number-of-count">
          <span>{number}:</span>
        </div>
        <Input icon={FiArrowRight} name="formula" />
        <Select
          name="proof-type"
          options={[
            { value: 'proposition', label: 'Proposition' },
            { value: 'axiom', label: 'Axiom' },
            { value: 'modus_ponens', label: 'M.P' },
          ]}
          onChange={addType}
          placeholder="Type"
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
      </Container>
    </Form>
  );
};

export default ProofLine;
