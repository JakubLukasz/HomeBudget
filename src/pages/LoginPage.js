import React, { useState } from 'react';
import { styled } from '@mui/styles';

import { Stack, Alert } from '@mui/material';

import Input from '@Components/atoms/Input';
import Text from '@Components/atoms/Text';
import Logo from '@Components/atoms/Logo';
import Link from '@Components/atoms/Link';
import Button from '@Components/atoms/Button';
import GuestLogin from '@Components/molecules/GuestLogin';

import { uniqueKey } from '@Helpers/uniqueKey';

import { useAuth } from '@Hooks/useAuth';
import { useFirestore } from '@Hooks/useFirestore';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Container = styled('div')({
  height: 'var(--app-height)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
})

const Form = styled('form')({
  width: '100%',
  padding: '0 20px',
  maxWidth: '500px',

  '@media screen and (min-width: 375px)': {
    padding: '0 40px',
  }
});

const StyledLink = styled(Link)({
  fontWeight: 500,
  fontSize: '0.9rem',
})

const RedirectLink = styled(StyledLink)({
  textAlign: 'center',
})

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const { createGuestData } = useFirestore();
  const { login, signup } = useAuth();
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

  const handleTestLogin = async () => {
    try {
      const id = await uniqueKey();
      const email = `guest_${id}@gmail.com`;
      const username = `guest_${id}@gmail.com`;
      const password = `guest_${id}`;
      const { user } = await signup(email, password);
      await createGuestData(user, username);
      history.push('/');
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <Container>
      <Logo />
      <Text variant="h6" component="p">
        Log in
      </Text>
      <GuestLogin handleTestLogin={handleTestLogin} />
      <Form onSubmit={handleSubmit(submitFormHandler)}>
        <Stack spacing={3}>
          {formError && <Alert severity="error">{formError}</Alert>}
          <Input
            Register={register('email', {
              required: 'Email is Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            Label="Email"
            Name="email"
            Errors={errors.email}
          />
          <Input
            Register={register('password', { required: 'Password is Required' })}
            Label="Password"
            Name="password"
            Type="password"
            Errors={errors.password}
          />
          <StyledLink to="/reset-password">Forgot password?</StyledLink>
          <Button
            fullWidth
            disabled={isLoading}
            type="submit"
          >
            log In
          </Button>
          <RedirectLink to="/signup">
            Want to create an account? Sign up
          </RedirectLink>
        </Stack>
      </Form>
    </Container>
  );
};

export default Login;
