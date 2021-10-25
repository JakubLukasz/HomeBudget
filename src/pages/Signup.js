import styled from 'styled-components';
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useFirestore } from '../hooks/useFirestore';
import { Link, useHistory } from 'react-router-dom';
import { devices } from '../assets/styles/devices';
import Logo from '../components/atoms/Logo';
import { useForm } from 'react-hook-form';
import { Typography, Stack, Alert } from '@mui/material';
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

const RedirectLink = styled(BaseLink)`
  margin-left: 5px;
  font-weight: 600;
  font-size: 0.8rem;
  text-align: center;
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
      <Typography variant="h6" component="p" sx={{ mb: 8 }}>
        Sign up
      </Typography>
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
            {...register('password', {
              required: 'Password is Required',
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters',
              },
            })}
            label="Password"
            variant="filled"
            size="small"
            type="password"
            name="password"
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password.message : ''}
          />
          <Input
            {...register('confirm__password', {
              validate: (value) =>
                value === getValues('password') || 'The passwords do not match',
            })}
            label="Password"
            variant="filled"
            size="small"
            type="password"
            name="confirm__password"
            error={errors.confirm__password ? true : false}
            helperText={
              errors.confirm__password ? errors.confirm__password.message : ''
            }
          />
          <LoadingButton
            fullWidth
            variant="contained"
            loading={isLoading}
            type="submit"
          >
            SIGN UP
          </LoadingButton>

          <RedirectLink to="/login">
            Already have an account? Log In
          </RedirectLink>
        </Stack>
      </Form>
    </Container>
  );
};

export default Signup;
