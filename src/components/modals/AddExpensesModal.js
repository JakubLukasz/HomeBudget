import styled from 'styled-components';
import { devices } from '../../assets/styles/devices';
import CloseIcon from '../../assets/images/closeIcon.svg';
import Icon from '../Icon';
import React, { useEffect, useState } from 'react';
import { useAddBill } from '../../hooks/useAddBill';
import { useForm } from 'react-hook-form';
import { useFirestore } from '../../hooks/useFirestore';
import { uniqueKey } from '../../helpers/uniqueKey';
import PropTypes from 'prop-types';

const Modal = styled.div`
  width: 94vw;
  background-color: ${({ theme }) => theme.color.white};
  position: fixed;
  top: 3vw;
  bottom: 3vw;
  left: 3vw;
  right: 3vw;
  color: black;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 15px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;

  @media ${devices.mobileM} {
    padding: 30px 25px;
  }

  @media ${devices.mobileL} {
    padding: 30px 40px;
  }

  @media ${devices.tablet} {
    width: 500px;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    transform: translate(-50%, -50%);
    padding: 15px 20px;
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

const CloseButton = styled.button`
  width: 20px;
  height: 20px;
`;

const InputLabel = styled.label`
  display: block;
  color: #000000;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  margin: 23px 0 3px 0;
`;

const InputField = styled.input`
  width: 100%;
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  background: ${({ theme }) => theme.color.lightSecondary};
  border: none;
  border-radius: 7px;
  outline: none;
  padding: 10px 15px;
`;

const ModalForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
  height: 100%;
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
  cursor: pointer;
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

const SwitchContainer = styled.div`
  width: 100%;
  background: none;
  border: none;
  border: 2px solid ${({ theme }) => theme.color.primary};
  border-radius: 7px;
  overflow: hidden;
  margin-top: 23px;
`;

const SwitchButton = styled.button`
  border: none;
  background: none;
  width: 50%;
  padding: 10px 0;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: 1.2rem;
  background-color: white;
  color: ${({ theme }) => theme.color.primary};
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;

  &.clicked {
    background-color: ${({ theme }) => theme.color.primary};
    color: white;
  }
`;

const Error = styled.p`
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: #ff0033;
  margin: 5px 0 0;
`;

const AddExpensesModal = ({ setIsExpensesModalOpen }) => {
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
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { addNewExpense } = useAddBill();
  const { getUserData, getExpenses } = useFirestore();

  const checkId = (expenses) => {
    const randomId = uniqueKey();
    expenses.forEach(({ id }) => {
      if (id === randomId) {
        return checkId(expenses);
      }
    });
    return randomId;
  };

  const generateKey = async () => {
    const expenses = await getExpenses();
    const generatedId = checkId(expenses);
    setRandomId(generatedId);
  };

  useEffect(() => {
    generateKey();
  }, []);

  useEffect(() => {
    getCurrency();
  }, []);

  const getCurrency = async () => {
    const { currency } = await getUserData();
    setCurrency(currency);
  };

  const changeSwitchColor = () => {
    setIsSpent((snapshot) => !snapshot);
  };

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
      if (month) {
        let value = index < 9 ? `0${index + 1}` : index + 1;
        tmp.push(value);
      }
    });
    return tmp;
  };

  const onSubmit = ({ title, amount, day }) => {
    if (months.filter((month) => month === true).length >= 1) {
      console.log(
        randomId,
        title,
        getCheckedMonths(months),
        parseFloat(day),
        parseFloat(amount),
        isSpent,
        currency
      );
      addNewExpense({
        id: randomId,
        title,
        months: getCheckedMonths(months),
        dayOfCollection: parseFloat(day),
        amount: parseFloat(amount),
        isSpent,
        currency,
      });
      closeModalHandler();
    } else {
      setMonthsError(true);
    }
  };

  return (
    <Modal>
      <Header>
        <Heading>add expense</Heading>
        <CloseButton onClick={closeModalHandler}>
          <Icon src={CloseIcon} />
        </CloseButton>
      </Header>
      <ModalForm onSubmit={handleSubmit(onSubmit)}>
        <InputLabel htmlFor="title">TITLE</InputLabel>
        <InputField
          {...register('title', { required: 'Title is required' })}
          type="text"
          id="title"
          name="title"
        ></InputField>
        {errors.title && <Error>{errors.title.message}</Error>}
        <InputLabel htmlFor="amount">AMOUNT</InputLabel>
        <InputField
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
        ></InputField>
        {errors.amount && <Error>{errors.amount.message}</Error>}
        <InputLabel>DAY OF COLLECTION ( 1 - 28 )</InputLabel>
        <InputField
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
        ></InputField>
        {errors.day && <Error>{errors.day.message}</Error>}
        <SwitchContainer>
          <SwitchButton
            type="button"
            onClick={changeSwitchColor}
            className={isSpent && 'clicked'}
          >
            SPENT
          </SwitchButton>
          <SwitchButton
            type="button"
            onClick={changeSwitchColor}
            className={!isSpent && 'clicked'}
          >
            EARNED
          </SwitchButton>
        </SwitchContainer>
        <InputLabel>MONTH OF COLLECTION ( 1 - 12 )</InputLabel>
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
              ></CheckboxInput>
              <CheckboxLabel>{month}</CheckboxLabel>
            </div>
          ))}
        </Checkbox>
        {monthsError && <Error>{monthsError}</Error>}
        <SubmitButton type="submit">ADD EXPENSE</SubmitButton>
      </ModalForm>
    </Modal>
  );
};

AddExpensesModal.propTypes = {
  setIsExpensesModalOpen: PropTypes.func,
};

export default AddExpensesModal;
