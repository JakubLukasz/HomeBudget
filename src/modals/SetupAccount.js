import React, { useState } from 'react';
import { styled } from '@mui/styles';

import { Stack, Alert } from '@mui/material';

import Button from '@Components/atoms/Button';
import Text from '@Components/atoms/Text';
import Logo from '@Components/atoms/Logo';
import Input from '@Components/atoms/Input';
import SelectInput from '@Components/atoms/SelectInput';

import { currencies } from '@Helpers/constantData';

import { useFirestore } from '@Hooks/useFirestore';
import { useForm } from 'react-hook-form';

import ReactDom from 'react-dom'

const Container = styled('div')({
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 100,
  display: 'flex',
  backgroundColor: '#ffffff',
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
})

const Form = styled("form")({
  width: '100%',
  padding: '0 40px',
  maxWidth: '500px',

  '@media screen and (min-width:768px)': {
    minWidth: '300px'
  }
})

const SetupAccount = () => {
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
        payday: payday.padStart(2, '0'),
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

  return ReactDom.createPortal(
    <Container>
      <Logo />
      <Text variant="h6" component="p" sx={{ mb: 8 }}>
        Setup Account
      </Text>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {formError && <Alert severity="error">{formError}</Alert>}
          <Input
            Register={register('firstname', { required: 'Firstname is required' })}
            Label="Firstname"
            Name="firstname"
            Errors={errors.firstname}
          />
          <Stack direction="row" justifyContent="center">
            <Input
              Register={register('earnings', {
                required: 'Earnings are required',
                min: {
                  value: 1,
                  message: 'You must enter a number greater than 0',
                },
              })}
              Label="Monthly earnings ( no taxes )"
              Name="earnings"
              Type="number"
              Errors={errors.earnings}
            />
          </Stack>
          <SelectInput
            Register={register('currency', {
              required: 'Currency is required',
            })}
            select
            Label="Currency"
            Name="currency"
            Errors={errors.currency}
            selectValue={currency}
            setSelectValue={setCurrency}
            options={currencies}
          />
          <Input
            Register={register('payday', {
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
            Label="Payday (1-28)"
            Name="payday"
            Type="number"
            Errors={errors.payday}
          />
          <Button
            fullWidth
            disabled={isLoading}
            type="submit"
          >
            DONE
          </Button>
        </Stack>
      </Form>
    </Container>, document.getElementById("modals")
  );
};

export default SetupAccount;
