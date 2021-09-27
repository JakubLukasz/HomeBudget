import styled from 'styled-components';
import React, { useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { devices } from '../assets/styles/devices';
import { useForm } from 'react-hook-form';
import Logo from './Logo';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  font-weight: ${({ theme }) => theme.font.weight.regular};
  text-align: center;
  font-size: 2rem;
  margin: 10px 0 70px;
`;

const SetupForm = styled.form`
  width: 100%;
  padding: 0 40px;
  max-width: 500px;

  @media ${devices.tablet} {
    min-width: 300px;
  }

  @media ${devices.tabletVer} {
    min-width: 300px;
  }
`;

const Title = styled.label`
  display: block;
  color: ${({ theme }) => theme.color.secondary};
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  margin: 23px 0 3px 0;
`;

const UserInput = styled.input`
  width: 100%;
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  background: ${({ theme }) => theme.color.lightSecondary};
  border: none;
  border-radius: 7px;
  outline: none;
  padding: 10px 15px;
`;

const EarningsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const EarningsInput = styled(UserInput)`
  flex: 7;
  margin: 0;
`;

const Currency = styled.select`
  padding: 10px;
  flex: 1;
  margin-left: 20px;
  border-radius: 7px;
  background-color: ${({ theme }) => theme.color.lightSecondary};
  border: none;
  font-weight: ${({ theme }) => theme.font.weight.medium};

  &:focus,
  &:hover {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  border: none;
  width: 100%;
  font-size: 1.7rem;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  background-color: ${({ theme }) => theme.color.primary};
  color: #ffffff;
  border-radius: 7px;
  padding: 10px 15px;
  margin-top: 23px;
`;

const CurrencyOption = styled.option`
  background: ${({ theme }) => theme.color.lightSecondary};
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

const SetupAccount = () => {
  const { setupUserData, setIsConfigured } = useFirestore();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async ({ firstname, earnings, currency, payday }) => {
    try {
      setFormError('');
      setIsLoading(true);
      await setupUserData({
        firstname,
        earnings: parseFloat(earnings),
        moneyLeft: 0,
        payday,
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
      <Heading>Setup Account</Heading>
      <SetupForm onSubmit={handleSubmit(onSubmit)}>
        {formError && <FormErrorMessage>{formError}</FormErrorMessage>}
        <Title>FIRST NAME</Title>
        <UserInput
          {...register('firstname', { required: 'Firstname is required' })}
          type="text"
          name="firstname"
        ></UserInput>
        {errors.firstname && <Error>{errors.firstname.message}</Error>}
        <Title>MONTHLY EARNINGS (NO TAXES)</Title>
        <EarningsContainer>
          <EarningsInput
            {...register('earnings', {
              required: 'Earnings are required',
              valueAsNumber: true,
            })}
            type="text"
            name="earnings"
          ></EarningsInput>
          <Currency {...register('currency')} name="currency">
            <CurrencyOption value="zł">zł</CurrencyOption>
            <CurrencyOption value="€">€</CurrencyOption>
            <CurrencyOption value="$">$</CurrencyOption>
          </Currency>
        </EarningsContainer>
        {errors.earnings && <Error>{errors.earnings.message}</Error>}
        <Title htmlFor="payday">PAYDAY (1-28)</Title>
        <UserInput
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
          type="text"
          name="payday"
        ></UserInput>
        {errors.payday && <Error>{errors.payday.message}</Error>}
        <SubmitButton disabled={isLoading} type="submit">
          DONE
        </SubmitButton>
      </SetupForm>
    </Container>
  );
};

export default SetupAccount;
