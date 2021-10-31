import styled from 'styled-components';
import React, { useState } from 'react';
import { useFirestore } from '@Hooks/useFirestore';
import { devices } from '@Assets/styles/devices';
import { useForm } from 'react-hook-form';
import Logo from '@Components/atoms/Logo';
import Input from '@Components/atoms/Input';
import { Stack, Typography, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import MenuItem from '@mui/material/MenuItem';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  padding: 0 40px;
  max-width: 500px;

  @media ${devices.tablet} {
    min-width: 300px;
  }
`;

const SetupAccount = () => {
  const currencies = ['zł', '€', '$'];
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currency, setCurrency] = useState('');
  const { setupUserData, setIsConfigured } = useFirestore();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ firstname, earnings, currency, payday }) => {
    try {
      setFormError('');
      setIsLoading(true);

      await setupUserData({
        firstname,
        earnings: parseFloat(earnings),
        moneyLeft: 0,
        payday: payday < 9,
        currency,
        isConfigured: true,
        paydayData: [],
      });
      setIsConfigured(true);
    } catch (error) {
      setFormError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Logo />
      <Typography variant="h6" component="p" sx={{ mb: 8 }}>
        Setup Account
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {formError && <Alert severity="error">{formError}</Alert>}
          <Input
            {...register('firstname', { required: 'Firstname is required' })}
            type="text"
            name="firstname"
            label="Firstname"
            variant="filled"
            size="small"
            error={errors.firstname ? true : false}
            helperText={errors.firstname ? errors.firstname.message : ''}
          />
          <Stack direction="row" justifyContent="center">
            <Input
              {...register('earnings', {
                required: 'Earnings are required',
                min: {
                  value: 1,
                  message: 'You must enter a number greater than 0',
                },
              })}
              type="number"
              name="earnings"
              label="Monthly earnings ( no taxes)"
              variant="filled"
              size="small"
              error={errors.earnings ? true : false}
              helperText={errors.earnings ? errors.earnings.message : ''}
            ></Input>
          </Stack>
          <Input
            {...register('currency', {
              required: 'Currency is required',
            })}
            select
            label="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            variant="filled"
            error={errors.currency ? true : false}
            helperText={errors.currency ? errors.currency.message : ''}
          >
            {currencies.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Input>
          <Input
            {...register('payday', {
              required: 'Payday is required',
              min: {
                value: 1,
                message: 'You must choose a number between 1 and 28',
              },
              max: {
                value: 28,
                message: 'You must choose a number between 1 and 28',
              },
            })}
            label="Payday (1-28)"
            variant="filled"
            size="small"
            type="number"
            name="payday"
            error={errors.payday ? true : false}
            helperText={errors.payday ? errors.payday.message : ''}
          ></Input>
          <LoadingButton
            fullWidth
            variant="contained"
            loading={isLoading}
            type="submit"
          >
            DONE
          </LoadingButton>
        </Stack>
      </Form>
    </Container>
  );
};

export default SetupAccount;
