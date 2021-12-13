import React, { useState } from 'react'
import { styled } from '@mui/styles'

import { Stack, Alert } from '@mui/material'

import Logo from '@Components/atoms/Logo'
import Input from '@Components/atoms/Input'
import Text from '@Components/atoms/Text'
import Link from '@Components/atoms/Link'
import Button from '@Components/atoms/Button'

import { useAuth } from '@Hooks/useAuth'
import { useForm } from 'react-hook-form'

const Container = styled('div')({
  height: 'var(--app-height)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

const Form = styled('form')({
  width: '100%',
  padding: '0 20px',
  maxWidth: '500px',
  marginTop: '50px',

  '@media screen and (min-width: 375px)': {
    padding: '0 40px',
  },
})

const StyledLink = styled(Link)({
  fontWeight: 500,
  fontSize: '0.9rem',
})

const ResetPasswordPage: React.FC = () => {
  const { resetPassword } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [formError, setFormError] = useState('')
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const submitFormHandler = async ({ email }: { email: string }) => {
    try {
      setFormError('')
      setFormMessage('')
      setIsLoading(true)
      await resetPassword(email)
      setFormMessage('Check your email')
    } catch (error: any) {
      setFormError(error.message)
    }
    setIsLoading(false)
  }

  return (
    <Container>
      <Logo />
      <Text variant="h6" component="p" sx={{ mb: 8 }}>
        Reset Password
      </Text>
      <Form onSubmit={handleSubmit(submitFormHandler)}>
        <Stack spacing={3}>
          {formError && <Alert severity="error">{formError}</Alert>}
          {formMessage && <Alert severity="success">{formMessage}</Alert>}
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
          <Button fullWidth disabled={isLoading} type="submit">
            RESET
          </Button>
          <StyledLink to="/login">Log In with your account</StyledLink>
        </Stack>
      </Form>
    </Container>
  )
}

export default ResetPasswordPage
