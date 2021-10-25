import styled from 'styled-components';
import { useInputData } from '../../hooks/useInputData';
import React, { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useForm } from 'react-hook-form';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs';
import DatePicker from '@mui/lab/DatePicker';
import { useUi } from '../../hooks/useUi';
import { Button, Stack } from '@mui/material';
import dayjs from 'dayjs';
import ModalTemplate from '../../templates/ModalTemplate';
import Input from '../atoms/Input';
import SpentSwitch from '../atoms/SpentSwitch';
import { styled as restyled } from '@mui/styles';

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Category = styled.div`
  flex: 1;
  background-color: #f0f0f0;
  border-bottom: 2px solid ${({ error }) => (error ? '#d32f2f' : '#909090')};
  display: flex;
  align-items: center;
  color: ${({ error }) => (error ? '#d32f2f' : '#606060')};
  font-size: 0.95rem;
  padding: 1rem 0.8rem;
`;

const CategoryErrorBox = restyled('p')(({ theme }) => ({
  color: theme.palette.error.main,
  fontWeight: '500',
  fontSize: '.7rem',
  margin: '5px 0 0 15px',
}));

const Color = restyled('p')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: '700',
  marginLeft: '5px',
}));

const AddBillModal = () => {
  const [isSpent, setIsSpent] = useState(true);
  const [todaysDate, setTodaysDate] = useState(dayjs());
  const [categoryError, setCategoryError] = useState('');
  const { getCurrency, generateTransactionsID, addNewBill } = useFirestore();
  const { selectedGroup, selectedCategory, setSelectedCategory } =
    useInputData();
  const { setIsCategoryModalOpen, isBillModalOpen, setIsBillModalOpen } =
    useUi();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ title, date, amount }) => {
    if (selectedCategory !== 'Not Selected...') {
      const id = await generateTransactionsID();
      const currency = await getCurrency();
      await addNewBill({
        id,
        title,
        category: selectedCategory,
        categoryGroup: selectedGroup,
        date: dayjs(date).format('YYYY-MM-DD'),
        amount: parseFloat(amount),
        isSpent,
        currency,
      });
      setSelectedCategory('Not Selected...');
      setIsBillModalOpen((snapshot) => !snapshot);
    } else {
      setCategoryError('Category is required');
    }
  };

  const closeModalHandler = () => {
    setSelectedCategory('Not Selected...');
    setIsBillModalOpen(false);
  };

  return (
    <ModalTemplate
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
          <Stack>
            <Stack direction="row" spacing={2}>
              <Category error={categoryError}>
                Category: <Color>{selectedCategory}</Color>
              </Category>
              <Button
                type="button"
                variant="contained"
                onClick={() => setIsCategoryModalOpen(true)}
              >
                SELECT
              </Button>
            </Stack>
            {categoryError && (
              <CategoryErrorBox>{categoryError}</CategoryErrorBox>
            )}
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
              onChange={(value) => setTodaysDate(value)}
              renderInput={(params) => <Input variant="filled" {...params} />}
            />
          </LocalizationProvider>
          <SpentSwitch isSpent={isSpent} setIsSpent={setIsSpent} />
          <Button fullWidth type="submit" variant="contained">
            Add Bill
          </Button>
        </Stack>
      </Form>
    </ModalTemplate>
  );
};

export default AddBillModal;
