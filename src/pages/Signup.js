import styled from 'styled-components';
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useFirestore } from '../hooks/useFirestore';
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

const SignupForm = styled.form`
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
`;

const LinkText = styled.p`
  color: ${({ theme }) => theme.color.secondary};
  font-size: 1.2rem;
  text-align: center;
  margin: 20px 0;
  font-weight: ${({ theme }) => theme.font.weight.regular};
`;

const FormLink = styled(Link)`
  color: ${({ theme }) => theme.color.primary};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  font-size: 1.2rem;
  margin-left: 5px;
  text-decoration: none;
`;

const FormErrorMessage = styled.p`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: #e04f5f;
`;

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const { signup } = useAuth();
  const { createUserData } = useFirestore();
  const history = useHistory();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submitFormHandler = async ({ email, password }) => {
    try {
      setFormError('');
      setIsLoading(true);
      const { user } = await signup(email, password);
      await createUserData(user);
      history.push('/');
    } catch (error) {
      setFormError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Logo />
      <Heading>Sign up</Heading>
      <SignupForm onSubmit={handleSubmit(submitFormHandler)}>
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
          {...register('password', {
            required: 'Password is Required',
            minLength: {
              value: 8,
              message: 'Password must have at least 8 characters',
            },
          })}
          type="password"
          name="password"
        />
        {errors.password && <Error>{errors.password.message}</Error>}
        <Label htmlFor="confirm-password">CONFIRM PASSWORD</Label>
        <Input
          {...register('confirm__password', {
            validate: (value) =>
              value === getValues('password') || 'The passwords do not match',
          })}
          type="password"
          name="confirm__password"
          required
        />
        {errors.confirm__password && (
          <Error>{errors.confirm__password.message}</Error>
        )}
        <SubmitButton disabled={isLoading} type="submit">
          SIGN UP
        </SubmitButton>
        <LinkText>
          Already have an account? <FormLink to="/login">Log In</FormLink>
        </LinkText>
      </SignupForm>
    </Container>
  );
};

export default Signup;
