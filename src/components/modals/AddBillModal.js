import styled from 'styled-components';
import { useInputData } from '../../hooks/useInputData';
import React, { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useForm } from 'react-hook-form';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs';
import DatePicker from '@mui/lab/DatePicker';
import { Button, Stack } from '@mui/material';
import dayjs from 'dayjs';
import Modal from '../Modal';
import Input from '../Input';
import SpentSwitch from '../SpentSwitch';

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AddBillModal = () => {
  const [isSpent, setIsSpent] = useState(true);
  const [todaysDate, setTodaysDate] = useState(dayjs());
  const { getCurrency, generateTransactionsID, addNewBill } = useFirestore();
  const {
    isBillModalOpen,
    setIsBillModalOpen,
    selectedGroup,
    selectedCategory,
    setSelectedCategory,
    setIsCategoryModalOpen,
  } = useInputData();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ title, category, date, amount }) => {
    const id = await generateTransactionsID();
    const currency = await getCurrency();
    await addNewBill({
      id,
      title,
      category,
      categoryGroup: selectedGroup,
      date: dayjs(date).format('YYYY-MM-DD'),
      amount: parseFloat(amount),
      isSpent,
      currency,
    });
    setSelectedCategory('');
    setIsBillModalOpen((snapshot) => !snapshot);
  };

  const closeModalHandler = () => {
    setSelectedCategory('');
    setIsBillModalOpen(false);
  };

  const handleDateChange = (value) => {
    setTodaysDate(value);
  };

  return (
    <Modal
      title="Add Bill"
      isOpen={isBillModalOpen}
      onClose={closeModalHandler}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <Input
            {...register('title', { required: 'Title is required' })}
            label="Title"
            variant="filled"
            size="small"
            type="text"
            id="title"
            name="title"
            error={errors.title ? true : false}
            helperText={errors.title ? errors.title.message : ''}
          />
          <Stack direction="row" spacing={2}>
            <Input
              {...register('category', {
                required: 'Category is required',
              })}
              variant="filled"
              label="Category"
              value={selectedCategory ?? ''}
              InputProps={{
                readOnly: true,
              }}
              error={errors.category ? true : false}
              helperText={errors.category ? errors.category.message : ''}
            />
            <Button
              type="button"
              variant="contained"
              onClick={() => setIsCategoryModalOpen((snapshot) => !snapshot)}
            >
              SELECT
            </Button>
          </Stack>
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
          />
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
              {...register('date', { required: 'Date is required' })}
              label="Date of bill"
              variant="filled"
              value={todaysDate}
              onChange={handleDateChange}
              renderInput={(params) => <Input variant="filled" {...params} />}
            />
          </LocalizationProvider>
          <SpentSwitch isSpent={isSpent} setIsSpent={setIsSpent} />
          <Button fullWidth type="submit" variant="contained">
            Add Bill
          </Button>
        </Stack>
      </Form>
    </Modal>
  );
};

export default AddBillModal;
