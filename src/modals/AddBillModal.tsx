import React, { useState } from 'react'
import { styled } from '@mui/styles'
import dayjs from 'dayjs'

import { Stack } from '@mui/material'

import Input from '@Components/atoms/Input'
import SpentSwitch from '@Components/atoms/SpentSwitch'
import Button from '@Components/atoms/Button'
import DateInput from '@Components/atoms/DateInput'
import SelectInput from '@Components/atoms/SelectInput'
import ModalTemplate from '@Components/templates/ModalTemplate'

import { categoriesList } from '@Helpers/constantData'

import { useFirestore } from '@Hooks/useFirestore'
import { useUi } from '@Hooks/useUi'
import { useForm } from 'react-hook-form'

const Form = styled('form')({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
})

const AddBillModal: React.FC = () => {
  const [isSpent, setIsSpent] = useState(true)
  const [category, setCategory] = useState('')
  const [date, setDate] = useState(dayjs())
  const { getCurrency, getUnusedTransactionsId, addNewBill } = useFirestore()
  const { setIsBillModalOpen } = useUi()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  interface ISubmitProps {
    title: string
    amount: string
    category: string
  }

  const onSubmit = async ({ title, amount, category }: ISubmitProps) => {
    const id = await getUnusedTransactionsId()
    const currency = await getCurrency()
    await addNewBill({
      id,
      title,
      category,
      date: dayjs(date).format('YYYY-MM-DD'),
      amount: parseFloat(amount),
      isSpent,
      currency,
    })
    setIsBillModalOpen(false)
  }

  return (
    <ModalTemplate title="Add Bill" onClose={() => setIsBillModalOpen(false)}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <Input
            Register={register('title', { required: 'Title is required' })}
            Label="Title"
            Name="title"
            Errors={errors.title}
          />
          <SelectInput
            Register={register('category', {
              required: 'Category is required',
            })}
            Label="Category"
            Name="category"
            Errors={errors.category}
            selectValue={category}
            setSelectValue={setCategory}
            options={categoriesList}
          />
          <Input
            Register={register('amount', {
              required: 'Amount is required',
              min: {
                value: 1,
                message: 'You must enter a number greater than 0',
              },
            })}
            Type="number"
            Label="Amount"
            Name="amount"
            step="0.01"
            Errors={errors.amount}
          />
          <DateInput
            Label="Date of bill"
            dateValue={date}
            setDateValue={setDate}
            Errors={errors.date}
          />
          <SpentSwitch isSpent={isSpent} setIsSpent={setIsSpent} />
          <Button fullWidth type="submit">
            Add Bill
          </Button>
        </Stack>
      </Form>
    </ModalTemplate>
  )
}

export default AddBillModal
