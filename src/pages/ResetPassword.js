import styled from 'styled-components';
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { devices } from '../assets/styles/devices';
import Logo from '../components/atoms/Logo';
import { Typography, Stack, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Input from '../components/atoms/Input';

const Container = styled.section`
  height: var(--app-height);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  padding: 0 20px;
  max-width: 500px;

  @media ${devices.mobileM} {
    padding: 0 40px;
  }
`;

const BaseLink = styled(Link)`
  color: ${({ theme }) => theme.color.primary};
  text-decoration: none;
`;

const RedirectLink = styled(BaseLink)`
  margin-left: 5px;
  font-weight: 600;
  font-size: 0.7rem;
  text-align: center;
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
      <Typography variant="h6" component="p" sx={{ mb: 8 }}>
        Reset Password
      </Typography>
      <Form onSubmit={handleSubmit(submitFormHandler)}>
        <Stack spacing={3}>
          {formError && <Alert severity="error">{formError}</Alert>}
          {formMessage && <Alert severity="success">{formMessage}</Alert>}
          <Input
            {...register('email', {
              required: 'Email is Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            label="Email"
            variant="filled"
            size="small"
            type="text"
            name="email"
            error={errors.email ? true : false}
            helperText={errors.email ? errors.email.message : ''}
          />
          <LoadingButton
            variant="contained"
            fullWidth
            loading={isLoading}
            type="submit"
          >
            RESET
          </LoadingButton>
          <RedirectLink to="/login">Log In with your account</RedirectLink>
        </Stack>
      </Form>
    </Container>
  );
};

export default ResetPassword;
