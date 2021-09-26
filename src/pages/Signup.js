import styled from 'styled-components';
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useFirestore } from '../hooks/useFirestore';
import { Link, useHistory } from 'react-router-dom';
import { devices } from '../assets/styles/devices';
import Logo from '../components/Logo';
import { useForm } from 'react-hook-form';

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

const InputLabel = styled.label`
  display: block;
  color: ${({ theme }) => theme.color.secondary};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  font-size: 1rem;
  margin: 23px 0 3px 0;
`;

const InputField = styled.input`
  width: 100%;
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  background: ${({ theme }) => theme.color.lightSecondary};
  border: none;
  border-radius: 7px;
  outline: none;
  padding: 10px 15px;
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

const SubmitButton = styled.button`
  width: 100%;
  font-size: 1.7rem;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  background-color: ${({ theme }) => theme.color.primary};
  color: #ffffff;
  border-radius: 7px;
  padding: 10px 15px;
  margin-top: 23px;
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

const Error = styled.p`
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: #ff0033;
  margin: 5px 0 0;
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
        <InputLabel htmlFor="email">E-MAIL</InputLabel>
        <InputField
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
        <InputLabel htmlFor="password">PASSWORD</InputLabel>
        <InputField
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
        <InputLabel htmlFor="confirm-password">CONFIRM PASSWORD</InputLabel>
        <InputField
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
