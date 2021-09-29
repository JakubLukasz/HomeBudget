import styled from 'styled-components';
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useHistory } from 'react-router-dom';
import { devices } from '../assets/styles/devices';
import Logo from '../components/Logo';
import { useForm } from 'react-hook-form';
import {
  Input,
  Label,
  SubmitButton,
  Error,
} from '../assets/styles/reusableStyles';

const Container = styled.section`
  height: var(--app-height);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled.form`
  width: 100%;
  padding: 0 20px;
  max-width: 500px;

  @media ${devices.mobileM} {
    padding: 0 40px;
  }

  @media ${devices.tablet} {
    min-width: 300px;
  }
`;

const Heading = styled.h1`
  font-weight: ${({ theme }) => theme.font.weight.regular};
  text-align: center;
  font-size: 2rem;
  margin: 10px 0 30px;

  @media ${devices.mobileM} {
    margin: 10px 0 70px;
  }
`;

const LinkText = styled.p`
  color: ${({ theme }) => theme.color.secondary};
  font-size: 1.2rem;
  text-align: center;
  margin: 20px 0;
  font-weight: ${({ theme }) => theme.font.weight.regular};
`;

const ResetLink = styled(Link)`
  display: block;
  color: ${({ theme }) => theme.color.primary};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  text-decoration: none;
  font-size: 1.2rem;
  margin-top: 20px;
`;

const FormLink = styled(Link)`
  color: ${({ theme }) => theme.color.primary};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  margin-left: 5px;
  text-decoration: none;
`;

const FormErrorMessage = styled.p`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: #e04f5f;
`;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const { login } = useAuth();
  const history = useHistory();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitFormHandler = async ({ email, password }) => {
    try {
      setFormError('');
      setIsLoading(true);
      await login(email, password);
      history.push('/');
    } catch (error) {
      setFormError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Logo />
      <Heading>Log in</Heading>
      <LoginForm onSubmit={handleSubmit(submitFormHandler)}>
        {formError && <FormErrorMessage>{formError}</FormErrorMessage>}
        <Label htmlFor="email">E-MAIL</Label>
        <Input
          {...register('email', {
            required: 'Email is Required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          type="text"
          name="email"
        />
        {errors.email && <Error>{errors.email.message}</Error>}
        <Label htmlFor="password">PASSWORD</Label>
        <Input
          {...register('password', { required: 'Password is Required' })}
          type="password"
          name="password"
        />
        {errors.password && <Error>{errors.password.message}</Error>}
        <ResetLink to="/reset-password">Forgot password?</ResetLink>
        <SubmitButton disabled={isLoading} type="submit">
          LOG IN
        </SubmitButton>
        <LinkText>
          Want to create an account? <FormLink to="/signup">Sign up</FormLink>
        </LinkText>
      </LoginForm>
    </Container>
  );
};

export default Login;
