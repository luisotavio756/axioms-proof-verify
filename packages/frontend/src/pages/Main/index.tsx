import { useRef } from 'react';

import { FiMoon, FiSearch, FiSun, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Title, Form, Container } from './styles';
import Logo from '../../assets/img/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useTheme } from '../../hooks/theme';

const Main: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { toggleTheme, theme } = useTheme();

  return (
    <Container data-testid="container">
      <button
        className={`button-switch-theme switch-to-${theme}`}
        type="button"
        onClick={toggleTheme}
      >
        {theme === 'light' ? (
          <>
            <FiMoon /> Dark mode
          </>
        ) : (
          <>
            <FiSun /> Light mode
          </>
        )}
      </button>
      <img src={Logo} alt="" />
      <Title>Find Profiles on Github</Title>
      <Form
        ref={formRef}
        onSubmit={() => {
          alert('ok');
        }}
        data-testid="form"
      >
        <Input
          data-testid="user-input"
          name="user"
          placeholder="Enter the Github username"
          type="text"
          icon={FiUser}
          className="user-input"
        />
        <Button
          type="submit"
          className="submit-button"
          data-testid="button-submit"
        >
          <FiSearch /> Find
        </Button>
      </Form>
    </Container>
  );
};

export default Main;
