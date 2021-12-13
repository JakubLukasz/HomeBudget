import React, { useState } from 'react'

import { Stack, Alert } from '@mui/material'

import Button from '@Components/atoms/Button'
import Input from '@Components/atoms/Input'
import ModalTemplate from '@Components/templates/ModalTemplate'

import { useUi } from '@Hooks/useUi'
import { useFirestore } from '@Hooks/useFirestore'
import { useForm } from 'react-hook-form'

const UpdateEarningsModal: React.FC = (): JSX.Element => {
  const [formError, setFormError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { setIsEarningsModalOpen } = useUi()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const { updateEarnings } = useFirestore()

  const onSubmit = async ({ earnings }) => {
    try {
      setFormError('')
      setIsLoading(true)
      updateEarnings(earnings)
    } catch (error: any) {
      setFormError(error.message)
    }
    setIsLoading(false)
    setIsEarningsModalOpen(false)
  }

  return (
    <ModalTemplate
      title="Update Payment"
      onClose={() => setIsEarningsModalOpen(false)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {formError && <Alert severity="error">{formError}</Alert>}
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
          <Button fullWidth disabled={isLoading} type="submit">
            Update
          </Button>
        </Stack>
      </form>
    </ModalTemplate>
  )
}
export default UpdateEarningsModal
