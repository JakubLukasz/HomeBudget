import styled from 'styled-components';
import { devices } from '../../assets/styles/devices';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFirestore } from '../../hooks/useFirestore';
import PropTypes from 'prop-types';
import {
  Input,
  Label,
  SubmitButton,
  Modal,
  Form,
  Error,
} from '../../assets/styles/reusableStyles';
import Switch from '../FormSwitch';
import CloseButton from '../CloseButton';
import { useInputData } from '../../hooks/useInputData';

const Content = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 15px 15px;

  @media ${devices.mobileM} {
    padding: 30px 25px;
  }
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;

  @media ${devices.mobileM} {
    margin: 20px 0;
  }
`;

const Heading = styled.h1`
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  font-size: 2rem;
  text-transform: capitalize;
`;

const CheckboxLabel = styled.label`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-left: 5px;
`;

const Checkbox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const CheckboxInput = styled.input`
  cursor: pointer;
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
  const [months, setMonths] = useState(
    new Array(monthsNames.length).fill(true)
  );
  const [isSpent, setIsSpent] = useState(true);
  const [monthsError, setMonthsError] = useState(false);
  const [currency, setCurrency] = useState('');
  const [randomId, setRandomId] = useState(null);
  const { setIsExpensesModalOpen } = useInputData();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { getUserData, generateExpensesID, addNewExpense } = useFirestore();

  useEffect(() => {
    generateExpensesID().then((resp) => setRandomId(resp));
  }, []);

  useEffect(() => {
    getUserData().then(({ currency }) => setCurrency(currency));
  }, []);

  const handleOnChange = (position) => {
    const updatedCheckedMonths = months.map((item, index) =>
      index === position ? !item : item
    );
    setMonths(updatedCheckedMonths);
  };

  const closeModalHandler = () => {
    setIsExpensesModalOpen(false);
  };

  const getCheckedMonths = (months) => {
    const tmp = [];
    months.forEach((month, index) => {
      if (month) tmp.push(`${index + 1}`);
    });
    return tmp;
  };

  const onSubmit = ({ title, amount, day }) => {
    if (months.filter((month) => month === true).length >= 1) {
      addNewExpense({
        id: randomId,
        title,
        months: getCheckedMonths(months),
        dayOfCollection: parseFloat(day),
        amount: parseFloat(amount),
        isSpent,
        currency,
        expenseCollection: [],
      });
      closeModalHandler();
    } else {
      setMonthsError(true);
    }
  };

  return (
    <Modal>
      <Content>
        <Header>
          <Heading>add expense</Heading>
          <CloseButton click={closeModalHandler} />
        </Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="title">TITLE</Label>
          <Input
            {...register('title', {
              required: 'Title is required',
            })}
            type="text"
            id="title"
            name="title"
          ></Input>
          {errors.title && <Error>{errors.title.message}</Error>}
          <Label htmlFor="amount">AMOUNT</Label>
          <Input
            {...register('amount', {
              required: 'Amount is required',
              min: {
                value: 1,
                message: 'You must enter a number greater than 0',
              },
            })}
            type="number"
            id="amount"
            name="amount"
            step="0.01"
          ></Input>
          {errors.amount && <Error>{errors.amount.message}</Error>}
          <Label>DAY OF COLLECTION ( 1 - 28 )</Label>
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
            type="number"
            id="day"
            name="day"
          />
          {errors.day && <Error>{errors.day.message}</Error>}
          <Switch isSpent={isSpent} setIsSpent={setIsSpent} />
          <Label>MONTH OF COLLECTION ( 1 - 12 )</Label>
          <Checkbox>
            {monthsNames.map((month, index) => (
              <div key={month}>
                <CheckboxInput
                  type="checkbox"
                  id={month}
                  name="month"
                  value={month}
                  checked={months[index]}
                  onChange={() => handleOnChange(index)}
                />
                <CheckboxLabel>{month}</CheckboxLabel>
              </div>
            ))}
          </Checkbox>
          {monthsError && <Error>{monthsError}</Error>}
          <SubmitButton type="submit">ADD EXPENSE</SubmitButton>
        </Form>
      </Content>
    </Modal>
  );
};

AddExpensesModal.propTypes = {
  setIsExpensesModalOpen: PropTypes.func,
};

export default AddExpensesModal;
