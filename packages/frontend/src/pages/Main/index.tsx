import React, { useState, useEffect, useRef, useCallback } from 'react';

import { FiMoon, FiSearch, FiSun, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Title, Form, Container } from './styles';
import Logo from '../../assets/img/logo.svg';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useTheme } from '../../hooks/theme';


interface IUser {
  name: string;
  login: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  location: string;
  followers: number;
  following: number;
  public_repos: number;
}

interface IRepository {
  id: number;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string;
  html_url: string;
}
interface IFormData {
  user: string;
}

const Main: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { toggleTheme, theme } = useTheme();
  const [starredRepos, setStarredRepos] = useState<IRepository[]>([]);
  const [user, setUser] = useState<IUser>({} as IUser);
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [loading, setLoading] = useState(false);



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
      <Form ref={formRef} onSubmit={() => {}} data-testid="form">
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
