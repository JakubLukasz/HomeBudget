import React, { useState } from 'react'
import { styled } from '@mui/styles'

import { Stack, Checkbox, FormControlLabel, Grid } from '@mui/material'

import Button from '@Components/atoms/Button'
import Input from '@Components/atoms/Input'
import Switch from '@Components/atoms/SpentSwitch'
import Text from '@Components/atoms/Text'
import ModalTemplate from '@Components/templates/ModalTemplate'
import SelectInput from '@/components/atoms/SelectInput'

import { monthNames, categoriesList } from '@Helpers/constantData'

import { useFirestore } from '@Hooks/useFirestore'
import { useUi } from '@Hooks/useUi'
import { useForm } from 'react-hook-form'

const CheckBoxLabel = styled(FormControlLabel)({
  '& .MuiTypography-root': {
    fontSize: '1rem',
    marginLeft: '7px',
  },
})

const StyledCheckBox = styled(Checkbox)({
  padding: '3px 0',
  marginLeft: '12px',
})

const MonthsError = styled(Text)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: '0.75rem',
  marginLeft: '12px',
}))

const Form = styled('form')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

const AddExpensesModal: React.FC = (): JSX.Element => {
  const monthsArray = monthNames.map(({ value }) => value)
  const [checkedMonths, setCheckedMonths] = useState<any>(
    new Array(monthsArray.length)
  )
  const [isSpent, setIsSpent] = useState(true)
  const [category, setCategory] = useState('')

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const { getUserData, getUnusedExpensesId, addNewExpense } = useFirestore()
  const { setIsExpensesModalOpen } = useUi()

  const addMonthNames = (monthsNumbers) => {
    const tmp = []
    monthsNumbers.forEach((monthNumber) => {
      tmp.push({
        id: monthNumber,
        name: monthNames.find(({ id }) => id === monthNumber).value,
      })
    })
    return tmp
  }

  const handleCheckboxChange = (e) => {
    setCheckedMonths({
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = async ({ title, amount, day, months, category }) => {
    const id = await getUnusedExpensesId()
    const { currency } = await getUserData()
    addNewExpense({
      id,
      title,
      months: addMonthNames(months),
      dayOfCollection: day,
      category,
      amount: parseFloat(amount),
      isSpent,
      currency,
      expenseCollection: [],
    })
    setIsExpensesModalOpen(false)
  }

  return (
    <ModalTemplate
      title="Add Expense"
      onClose={() => setIsExpensesModalOpen(false)}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          <Input
            Register={register('title', {
              required: 'Title is required',
            })}
            Label="Title"
            Name="title"
            Errors={errors.title}
          />
          <Input
            Register={register('amount', {
              required: 'Amount is required',
              min: {
                value: 1,
                message: 'You must enter a number greater than 0',
              },
            })}
            Label="Amount"
            Name="amount"
            Type="number"
            Errors={errors.amount}
            step="0.01"
          />
          <Input
            Register={register('day', {
              required: 'Day of collection is required',
              min: {
                value: 1,
                message: 'You must choose a number between 1 and 28',
              },
              max: {
                value: 28,
                message: 'You must choose a number between 1 and 28',
              },
            })}
            Label="Day of collection ( 1 - 28 )"
            Type="number"
            Name="day"
            Errors={errors.day}
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
          <Stack>
            <Grid container>
              {monthsArray.map((month, index) => (
                <Grid key={month} item xs={6}>
                  <CheckBoxLabel
                    control={
                      <StyledCheckBox
                        name={month}
                        value={index < 9 ? `0${index + 1}` : `${index + 1}`}
                        {...register('months', {
                          validate: (value) =>
                            value.length > 0 ||
                            'You have to select at least one month',
                        })}
                        defaultChecked
                        checked={checkedMonths[index]}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={month}
                  />
                </Grid>
              ))}
            </Grid>
            {errors.months && (
              <MonthsError variant="p1" component="p">
                {errors.months.message}
              </MonthsError>
            )}
          </Stack>
          <Switch isSpent={isSpent} setIsSpent={setIsSpent} />
          <Button fullWidth type="submit">
            ADD EXPENSE
          </Button>
        </Stack>
      </Form>
    </ModalTemplate>
  )
}

export default AddExpensesModal
