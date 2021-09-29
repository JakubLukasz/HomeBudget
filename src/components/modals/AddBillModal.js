import styled from 'styled-components';
import { useInputData } from '../../hooks/useInputData';
import React, { useRef, useEffect, useState } from 'react';
import SelectCategoryModal from './SelectCategoryModal';
import { devices } from '../../assets/styles/devices';
import { useFirestore } from '../../hooks/useFirestore';
import { useForm } from 'react-hook-form';
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

const AddBillModal = () => {
  const [isSpent, setIsSpent] = useState(true);
  const [isSelectCategoryOpen, setIsSelectCategoryOpen] = useState(false);
  const [currency, setCurrency] = useState('');
  const [randomId, setRandomId] = useState(null);
  const [categoryError, setCategoryError] = useState('');
  const { getCurrency, addNewBill, generateTransactionsID } = useFirestore();
  const { setIsModalOpen, selectedCategory, setSelectedCategory } =
    useInputData();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const categoryRef = useRef();

  const changeDateFormat = (date) => {
    const arr = date.split('-');
    const year = arr[0];
    const month = arr[1];
    const day = arr[2];
    return `${day}.${month}.${year}`;
  };

  useEffect(() => {
    generateTransactionsID().then((id) => setRandomId(id));
  }, []);

  useEffect(() => {
    getCurrency().then((resp) => setCurrency(resp));
  }, []);

  const onSubmit = ({ title, date, amount }) => {
    if (categoryRef.current.innerText != 'Not Selected...') {
      addNewBill({
        id: randomId,
        title,
        categoryTitle: categoryRef.current.innerText,
        categorySrc: selectedCategory.src,
        date: changeDateFormat(date),
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

  const closeModalHandler = () => {
    setSelectedCategory('');
    setIsModalOpen((snapshot) => !snapshot);
  };

  return (
    <Modal>
      <Content>
        {isSelectCategoryOpen && (
          <SelectCategoryModal
            setIsSelectCategoryOpen={setIsSelectCategoryOpen}
          />
        )}
        <Header>
          <Heading>Add Bill</Heading>
          <CloseButton click={closeModalHandler} />
        </Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="title">TITLE</Label>
          <Input
            {...register('title', { required: 'Title is required' })}
            type="text"
            id="title"
            name="title"
          />
          {errors.title && <Error>{errors.title.message}</Error>}
          <Label htmlFor="category">CATEGORY</Label>
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
          <Label htmlFor="date">DATE OF PURCHASE</Label>
          <Input
            {...register('date', { required: 'Date is required' })}
            type="date"
            name="date"
          />
          {errors.date && <Error>{errors.date.message}</Error>}
          <Label htmlFor="amount">AMOUNT</Label>
          <MoneyInputContainer>
            <Input
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
            />
            <Currency>{currency}</Currency>
          </MoneyInputContainer>
          {errors.amount && <Error>{errors.amount.message}</Error>}
          <Switch isSpent={isSpent} setIsSpent={setIsSpent} />
          <SubmitButton type="submit">ADD BILL</SubmitButton>
        </Form>
      </Content>
    </Modal>
  );
};

export default AddBillModal;
