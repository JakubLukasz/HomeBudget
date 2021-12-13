import React, { useState } from 'react'
import { styled } from '@mui/styles'

import { Stack, Alert } from '@mui/material'

import Button from '@Components/atoms/Button'
import Text from '@Components/atoms/Text'
import Logo from '@Components/atoms/Logo'
import Input from '@Components/atoms/Input'
import SelectInput from '@Components/atoms/SelectInput'

import { currencies } from '@Helpers/constantData'

import { useFirestore } from '@Hooks/useFirestore'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'

const Container = styled('div')({
  height: 'var(--app-height)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

const Form = styled('form')({
  width: '100%',
  padding: '0 40px',
  maxWidth: '500px',
  marginTop: '50px',

  '@media screen and (min-width:768px)': {
    minWidth: '300px',
  },
})

const SetupAccountPage: React.FC = (): JSX.Element => {
  const [formError, setFormError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currency, setCurrency] = useState('')
  const { setupUserData, setIsConfigured } = useFirestore()

  const history = useHistory()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  interface IOnSubmit {
    firstname: string
    earnings: string
    currency: string
    payday: string
  }

  const onSubmit = async ({
    firstname,
    earnings,
    currency,
    payday,
  }: IOnSubmit): Promise<void> => {
    try {
      setFormError('')
      setIsLoading(true)

      await setupUserData({
        firstname,
        earnings: parseFloat(earnings),
        moneyLeft: 0,
        payday: payday.padStart(2, '0'),
        currency,
        isConfigured: true,
        paydayData: [],
      })
      setIsConfigured(true)
      history.push('/')
    } catch (error: any) {
      setFormError(error.message)
    }
    setIsLoading(false)
  }

  return (
    <Container>
      <Logo />
      <Text variant="h6" component="p" sx={{ mb: 8 }}>
        Setup Account
      </Text>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {formError && <Alert severity="error">{formError}</Alert>}
          <Input
            Register={register('firstname', {
              required: 'Firstname is required',
            })}
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
          <Button fullWidth disabled={isLoading} type="submit">
            DONE
          </Button>
        </Stack>
      </Form>
    </Container>
  )
}

export default SetupAccountPage
