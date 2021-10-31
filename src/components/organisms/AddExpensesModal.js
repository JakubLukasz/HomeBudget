import styled from 'styled-components';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFirestore } from '@Hooks/useFirestore';
import PropTypes from 'prop-types';
import Switch from '@Components/atoms/SpentSwitch';
import { useUi } from '@Hooks/useUi';
import ModalTemplate from '@Components/templates/ModalTemplate';
import Input from '@Components/atoms/Input';
import {
  Stack,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  Button,
} from '@mui/material';
import { styled as restyled } from '@mui/styles';

const SCheckBox = styled(Checkbox)`
  padding: 3px 0;
  margin-left: 12px;
`;

const MonthsError = restyled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: '0.75rem',
  marginLeft: '12px',
}));

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AddExpensesModal = () => {
  const monthsNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [checkedMonths, setCheckedMonths] = useState(
    new Array(monthsNames.length)
  );
  const [isSpent, setIsSpent] = useState(true);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { getUserData, generateExpensesID, addNewExpense } = useFirestore();
  const { isExpensesModalOpen, setIsExpensesModalOpen } = useUi();

  const handleCheckboxChange = (e) => {
    setCheckedMonths({
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async ({ title, amount, day, months }) => {
    const id = await generateExpensesID();
    const { currency } = await getUserData();
    addNewExpense({
      id,
      title,
      months,
      dayOfCollection: parseFloat(day),
      amount: parseFloat(amount),
      isSpent,
      currency,
      expenseCollection: [],
    });
    setIsExpensesModalOpen(false);
  };

  return (
    <ModalTemplate
      margin
      title="Add Expense"
      isOpen={isExpensesModalOpen}
      onClose={() => setIsExpensesModalOpen(false)}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Input
            {...register('title', {
              required: 'Title is required',
            })}
            label="Title"
            variant="filled"
            size="small"
            type="text"
            id="title"
            name="title"
            error={errors.title ? true : false}
            helperText={errors.title ? errors.title.message : ''}
          ></Input>
          <Input
            {...register('amount', {
              required: 'Amount is required',
              min: {
                value: 1,
                message: 'You must enter a number greater than 0',
              },
            })}
            label="Amount"
            variant="filled"
            size="small"
            type="number"
            id="amount"
            name="amount"
            step="0.01"
            error={errors.amount ? true : false}
            helperText={errors.amount ? errors.amount.message : ''}
          ></Input>
          <Input
            {...register('day', {
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
            label="Day of collection ( 1 - 28 )"
            variant="filled"
            size="small"
            type="number"
            id="day"
            name="day"
            error={errors.day ? true : false}
            helperText={errors.day ? errors.day.message : ''}
          />
          <Stack>
            <Grid container>
              {monthsNames.map((month, index) => (
                <Grid key={month} item xs={6}>
                  <FormControlLabel
                    control={
                      <SCheckBox
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
              <MonthsError variant="subtitle2" component="p">
                {errors.months.message}
              </MonthsError>
            )}
          </Stack>
          <Switch isSpent={isSpent} setIsSpent={setIsSpent} />
          <Button fullWidth variant="contained" type="submit">
            ADD EXPENSE
          </Button>
        </Stack>
      </Form>
    </ModalTemplate>
  );
};

AddExpensesModal.propTypes = {
  setIsExpensesModalOpen: PropTypes.func,
};

export default AddExpensesModal;
