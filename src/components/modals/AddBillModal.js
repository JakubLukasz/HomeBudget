import styled from 'styled-components';
import { useAddBill } from '../../hooks/useAddBill';
import React, { useRef, useEffect, useState } from 'react';
import CloseIcon from '../../assets/images/closeIcon.svg';
import SelectCategoryModal from './SelectCategoryModal';
import Icon from '../Icon';
import { devices } from '../../assets/styles/devices';
import { useFirestore } from '../../hooks/useFirestore';
import { uniqueKey } from '../../helpers/uniqueKey';
import { useForm } from 'react-hook-form';

const Modal = styled.div`
  width: 94vw;
  background-color: #ffffff;
  position: fixed;
  top: 3vw;
  bottom: 3vw;
  left: 3vw;
  right: 3vw;
  color: black;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;

  @media ${devices.tablet} {
    width: 500px;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    transform: translate(-50%, -50%);
  }
`;

const ModalMain = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 15px 15px;

  @media ${devices.mobileM} {
    padding: 30px 25px;
  }
`;

const CloseButton = styled.button`
  width: 20px;
  height: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

const Heading = styled.h1`
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  font-size: 2rem;
  text-transform: capitalize;
`;

const ModalForm = styled.form`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
`;

const InputLabel = styled.label`
  color: black;
  display: block;
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
  padding: 10px 15px;
`;

const SwitchContainer = styled.div`
  width: 100%;
  border: 2px solid ${({ theme }) => theme.color.primary};
  border-radius: 7px;
  overflow: hidden;
  margin-top: 23px;
`;

const SwitchButton = styled.button`
  width: 50%;
  padding: 10px 0;
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  background-color: ${({ theme, isSpent }) =>
    isSpent ? theme.color.primary : 'white'};
  color: ${({ theme, isSpent }) => (isSpent ? 'white' : theme.color.primary)};
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
`;

const MoneyInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Currency = styled.div`
  color: #ffffff;
  background-color: black;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-left: 10px;
  font-size: 1.4rem;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  border-radius: 7px;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.lightSecondary};
  color: black;
`;

const SubmitButton = styled.button`
  width: 100%;
  font-size: 1.7rem;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  background-color: ${({ theme }) => theme.color.primary};
  color: #ffffff;
  border-radius: 7px;
  padding: 10px 15px;
  margin-top: 23px;
`;

const CategoryContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const SelectCategory = styled.button`
  flex: 4;
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  background-color: ${({ theme }) => theme.color.primary};
  color: #ffffff;
  border-radius: 7px;
  margin-left: 10px;
  padding: 10px 15px;

  @media ${devices.mobileL} {
    margin-left: 30px;
    flex: 1;
  }
`;

const CategoryView = styled.p`
  flex: 3;
  display: inline-block;
  margin: 0;
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  background: ${({ theme }) => theme.color.lightSecondary};
  border: none;
  border-radius: 7px;
  outline: none;
  padding: 10px 15px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  @media ${devices.mobileL} {
    flex: 1;
  }
`;

const Error = styled.p`
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: #ff0033;
  margin: 5px 0 0;
`;

const AddBillModal = () => {
  const [isSpent, setIsSpent] = useState(true);
  const [isSelectCategoryOpen, setIsSelectCategoryOpen] = useState(false);
  const [currency, setCurrency] = useState('');
  const [randomId, setRandomId] = useState(null);
  const [categoryError, setCategoryError] = useState('');
  const { getCurrency, getTransactions } = useFirestore();
  const { setIsModalOpen, addNewBill, selectedCategory, setSelectedCategory } =
    useAddBill();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const categoryRef = useRef();

  const checkId = (transactions) => {
    const randomId = uniqueKey();
    transactions.forEach(({ id }) => {
      if (id === randomId) {
        return checkId(transactions);
      }
    });
    return randomId;
  };

  const generateKey = async () => {
    const transactions = await getTransactions();
    const generatedId = checkId(transactions);
    setRandomId(generatedId);
  };

  useEffect(() => {
    generateKey();
  }, []);

  useEffect(() => {
    currencyHandler();
  }, []);

  const currencyHandler = async () => {
    const currencyValue = await getCurrency();
    setCurrency(currencyValue);
  };

  const onSubmit = ({ title, date, amount }) => {
    if (categoryRef.current.innerText != 'Not Selected...') {
      addNewBill({
        id: randomId,
        title,
        categoryTitle: categoryRef.current.innerText,
        categorySrc: selectedCategory.src,
        date: date,
        amount: parseFloat(amount),
        isSpent,
        currency,
      });
      setSelectedCategory('');
      setIsModalOpen((snapshot) => !snapshot);
    } else setCategoryError('Category is required');
  };

  const selectCategoryHandler = () =>
    setIsSelectCategoryOpen((snapshot) => !snapshot);

  const changeSwitchColor = () => setIsSpent((snapshot) => !snapshot);

  const closeModalHandler = () => {
    setSelectedCategory('');
    setIsModalOpen((snapshot) => !snapshot);
  };

  return (
    <Modal>
      <ModalMain>
        {isSelectCategoryOpen && (
          <SelectCategoryModal
            setIsSelectCategoryOpen={setIsSelectCategoryOpen}
          />
        )}
        <Header>
          <Heading>Add Bill</Heading>
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
          <InputLabel htmlFor="category">CATEGORY</InputLabel>
          <CategoryContainer>
            <CategoryView ref={categoryRef}>
              {selectedCategory.title
                ? selectedCategory.title
                : 'Not Selected...'}
            </CategoryView>
            <SelectCategory type="button" onClick={selectCategoryHandler}>
              SELECT CATEGORY
            </SelectCategory>
          </CategoryContainer>
          {categoryError && <Error>{categoryError}</Error>}
          <InputLabel htmlFor="date">DATE OF PURCHASE</InputLabel>
          <InputField
            {...register('date', { required: 'Date is required' })}
            type="date"
            name="date"
          ></InputField>
          {errors.date && <Error>{errors.date.message}</Error>}
          <InputLabel htmlFor="amount">AMOUNT</InputLabel>
          <MoneyInputContainer>
            <InputField
              {...register('amount', {
                required: 'Amount is required',
                min: {
                  value: 1,
                  message: 'You must enter a number greater than 0',
                },
              })}
              type="number"
              name="amount"
              step="0.01"
            ></InputField>
            <Currency>{currency}</Currency>
          </MoneyInputContainer>
          {errors.amount && <Error>{errors.amount.message}</Error>}
          <SwitchContainer>
            <SwitchButton
              isSpent={isSpent}
              type="button"
              onClick={changeSwitchColor}
            >
              SPENT
            </SwitchButton>
            <SwitchButton
              isSpent={!isSpent}
              type="button"
              onClick={changeSwitchColor}
            >
              EARNED
            </SwitchButton>
          </SwitchContainer>
          <SubmitButton type="submit">ADD BILL</SubmitButton>
        </ModalForm>
      </ModalMain>
    </Modal>
  );
};

export default AddBillModal;
