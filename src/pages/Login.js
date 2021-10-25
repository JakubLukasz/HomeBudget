import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import { Link, useHistory } from 'react-router-dom';
import { devices } from '../assets/styles/devices';
import Logo from '../components/atoms/Logo';
import { useForm } from 'react-hook-form';
import GuestLogin from '../components/molecules/GuestLogin';
import { Stack, Typography, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Input from '../components/atoms/Input';
import { styled as restyled } from '@mui/styles';

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

const BaseLink = restyled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
}));

const ResetLink = styled(BaseLink)`
  font-weight: 500;
  font-size: 0.9rem;
`;

const RedirectLink = styled(BaseLink)`
  margin-left: 5px;
  font-weight: 600;
  font-size: 0.8rem;
  text-align: center;
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
      <Typography variant="h6" component="p">
        Log in
      </Typography>
      <GuestLogin setFormError={setFormError} />
      <Form onSubmit={handleSubmit(submitFormHandler)}>
        <Stack spacing={3}>
          {formError && <Alert severity="error">{formError}</Alert>}
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
          <Input
            {...register('password', { required: 'Password is Required' })}
            label="Password"
            variant="filled"
            size="small"
            type="password"
            name="password"
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password.message : ''}
          />
          <ResetLink to="/reset-password">Forgot password?</ResetLink>
          <LoadingButton
            fullWidth
            loading={isLoading}
            variant="contained"
            type="submit"
          >
            log In
          </LoadingButton>
          <RedirectLink to="/signup">
            Want to create an account? Sign up
          </RedirectLink>
        </Stack>
      </Form>
    </Container>
  );
};

export default Login;
