import styled from 'styled-components';
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { devices } from '../assets/styles/devices';
import Logo from '../components/Logo';
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

const ResetForm = styled.form`
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

const FormLink = styled(Link)`
  color: ${({ theme }) => theme.color.primary};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  margin-left: 5px;
  text-decoration: none;
`;

const LinkText = styled.p`
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin: 20px 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.secondary};
  text-align: center;
`;

const FormErrorMessage = styled.p`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: #e04f5f;
`;

const FormMessage = styled.span`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: #32bea6;
`;

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [formError, setFormError] = useState('');
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitFormHandler = async ({ email }) => {
    try {
      setFormError('');
      setFormMessage('');
      setIsLoading(true);
      await resetPassword(email);
      setFormMessage('Check your email');
    } catch (error) {
      setFormError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Logo />
      <Heading>Reset Password</Heading>
      <ResetForm onSubmit={handleSubmit(submitFormHandler)}>
        {formError && <FormErrorMessage>{formError}</FormErrorMessage>}
        {formMessage && <FormMessage>{formMessage}</FormMessage>}
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
        <SubmitButton disabled={isLoading} type="submit">
          RESET
        </SubmitButton>
        <LinkText>
          <FormLink to="/login">Log In </FormLink>with your account
        </LinkText>
      </ResetForm>
    </Container>
  );
};

export default ResetPassword;
