import React, { useState } from 'react';
import { styled } from '@mui/styles';

import { Stack, Alert } from '@mui/material';

import Text from '@Components/atoms/Text';
import Input from '@Components/atoms/Input';
import Logo from '@Components/atoms/Logo';
import Link from '@Components/atoms/Link';
import Button from '@Components/atoms/Button';

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
});

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
      <Text variant="h6" component="p" sx={{ mb: 8 }}>
        Sign up
      </Text>
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
            Register={register('password', {
              required: 'Password is Required',
              minLength: {
                value: 8,
                message: 'Password must have at least 8 characters',
              },
            })}
            Label="Password"
            Name="password"
            Type="password"
            Errors={errors.password}
          />
          <Input
            Register={register('confirm__password', {
              validate: (value) =>
                value === getValues('password') || 'The passwords do not match',
            })}
            Label="Confirm password"
            Name="confirm__password"
            Type="password"
            Errors={errors.confirm__password}
          />
          <Button
            fullWidth
            disabled={isLoading}
            type="submit"
          >
            SIGN UP
          </Button>

          <StyledLink to="/login">
            Already have an account? Log In
          </StyledLink>
        </Stack>
      </Form>
    </Container>
  );
};

export default Signup;
