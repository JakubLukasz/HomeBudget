import React, { useState } from 'react';
import { styled } from '@mui/styles';
import dayjs from 'dayjs';

import { Stack } from '@mui/material';

import Input from '@Components/atoms/Input';
import SpentSwitch from '@Components/atoms/SpentSwitch';
import Button from '@Components/atoms/Button';
import DateInput from '@Components/atoms/DateInput';
import ModalTemplate from '@Components/templates/ModalTemplate';
import Text from '@Components/atoms/Text';
import Icon from '@Components/atoms/Icon';

import { categories } from '@Helpers/constantData';

import { useFirestore } from '@Hooks/useFirestore';
import { useUi } from '@Hooks/useUi';
import { useForm } from 'react-hook-form';

import ReactDom from 'react-dom';

const Form = styled('form')({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
})

const Category = styled('div')((props) => ({
  flex: 1,
  backgroundColor: '#f0f0f0',
  borderBottom: `2px solid ${props.error ? '#d32f2f' : '#909090'}`,
  display: 'flex',
  alignItems: 'center',
  color: `${props.error ? '#d32f2f' : '#606060'}`,
  fontSize: '0.95rem',
  padding: '1rem 0.8rem',
}))

const CategoryErrorBox = styled(Text)(({ theme }) => ({
  color: theme.palette.error.main,
  fontWeight: '500',
  fontSize: '.7rem',
  margin: '5px 0 0 15px',
}));

const Color = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: '700',
  marginLeft: '5px',
}));

const CategoryButton = styled(Button)(({ theme }) => ({
  justifyContent: 'flex-start',
  padding: '10px 10px 10px 20px',
  fontSize: '1rem',
  backgroundColor: theme.palette.secondary.light,
  textTransform: 'capitalize',
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
    marginRight: '10px'
  }
}))

const AddBillModal = () => {
  const [isSpent, setIsSpent] = useState(true);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);
  const [subCategories, setSubCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("Not Selected...");
  const [todaysDate, setTodaysDate] = useState(dayjs(new Date()).format("YYYY-MM-DD"));
  const [categoryError, setCategoryError] = useState('');

  const { getCurrency, getCollectionId, addNewBill } = useFirestore();
  const { setIsBillModalOpen } = useUi();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ title, date, amount }) => {
    console.log(date)
    if (selectedSubCategory !== 'Not Selected...') {
      const id = await getCollectionId('transactions');
      const currency = await getCurrency();
      await addNewBill({
        id,
        title,
        category: selectedSubCategory,
        categoryGroup: selectedCategory,
        date,
        amount: parseFloat(amount),
        isSpent,
        currency,
      });
      setSelectedSubCategory("Not Selected...");
      setIsBillModalOpen(false);
    } else {
      setCategoryError('Category is required');
    }
  };

  const selectCategory = (e) => {
    setIsSubCategoryModalOpen(false);
    setIsCategoryModalOpen(false);
    setSelectedSubCategory(e.target.innerText);
  };

  const closeModalHandler = () => {
    setSelectedSubCategory("Not Selected...")
    setIsBillModalOpen(false);
  };

  const openSubCategoryModalHandler = (title) => {
    setSelectedCategory(title);
    setSubCategories(getSubCategories(title))
    setIsCategoryModalOpen(false);
    setIsSubCategoryModalOpen(true);
  };

  const getSubCategories = (title) => {
    const { subCategories } = categories.find((category) => category.title === title);
    return subCategories;
  };

  return ReactDom.createPortal(
    <ModalTemplate
      title="Add Bill"
      onClose={closeModalHandler}
    >
      {isCategoryModalOpen && <Stack direction="column" alignItems="flex-start" spacing={2}>
        {categories.map(({ title }) => (
          <CategoryButton
            fullWidth
            key={title}
            secondary
            onClick={() => openSubCategoryModalHandler(title)}
          >
            <Icon type={title} />
            <Text variant="h6" component="p">
              {title}
            </Text>
          </CategoryButton>
        ))}
      </Stack>}
      {isSubCategoryModalOpen && <Stack direction="column" alignItems="flex-start" spacing={2}>
        {subCategories.map((category) => (
          <CategoryButton
            fullWidth
            key={category}
            secondary
            onClick={selectCategory}
          >
            <Icon type={selectedCategory} />
            <Text variant="h6" component="p">
              {category}
            </Text>
          </CategoryButton>
        ))}
      </Stack>}
      {!isCategoryModalOpen && !isSubCategoryModalOpen &&
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Input
              Register={register('title', { required: 'Title is required' })}
              Label="Title"
              Name="title"
              Errors={errors.title}
            />
            <Stack>
              <Stack direction="row" spacing={2}>
                <Category error={categoryError}>
                  Category: <Color>{selectedSubCategory}</Color>
                </Category>
                <Button
                  type="button"
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
            <DateInput Register={register('date', { required: 'Date is required' })} Label="Date of bill" dateValue={todaysDate} setDateValue={setTodaysDate} />
            <SpentSwitch isSpent={isSpent} setIsSpent={setIsSpent} />
            <Button fullWidth type="submit">
              Add Bill
            </Button>
          </Stack>
        </Form>}
    </ModalTemplate>, document.getElementById("modals")
  );
};

export default AddBillModal;
