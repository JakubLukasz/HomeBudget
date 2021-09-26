import styled from 'styled-components';
import { devices } from '../../assets/styles/devices';
import BackIcon from '../../assets/images/backIcon.svg';
import Icon from '../Icon';
import SubCategoryModal from './SubCategoryModal';
import React, { useState } from 'react';
import foodIcon from '../../assets/images/food.svg';
import carIcon from '../../assets/images/car.svg';
import homeIcon from '../../assets/images/home.svg';
import shoppingIcon from '../../assets/images/shoppingBag.svg';
import feesIcon from '../../assets/images/fees.svg';
import entertainmentIcon from '../../assets/images/person.svg';
import otherIcon from '../../assets/images/square.svg';
import PropTypes from 'prop-types';

const Modal = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: black;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 15px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  overflow: auto;

  @media ${devices.mobileM} {
    padding: 30px 25px;
  }

  @media ${devices.mobileL} {
    padding: 30px 40px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const Heading = styled.h1`
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  font-size: 2rem;
  text-transform: capitalize;
`;

const BackButton = styled.button`
  width: 30px;
  height: 30px;
`;

const CategoryButton = styled.button`
  width: 100%;
  border: none;
  background: none;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 7px;
  margin-top: 12px;
  background-color: ${({ theme }) => theme.color.lightSecondary};

  @media ${devices.laptop} {
    padding: 7px;
    margin-top: 7px;
  }
`;

const CategoryIcon = styled(Icon)`
  height: 2rem;
  width: 2rem;
  fill: white;
`;

const IconContainer = styled.div`
  background-color: ${({ theme }) => theme.color.primary};
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${devices.laptop} {
    padding: 5px;
  }
`;

const CategorySpan = styled.span`
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin-left: 20px;
`;

const SelectCategoryModal = ({ setIsSelectCategoryOpen }) => {
  const mainCategories = [
    {
      src: foodIcon,
      title: 'Food',
      subCategories: ['Groceries', 'Bar, Cafe', 'Restaurant'],
    },
    {
      src: carIcon,
      title: 'Car',
      subCategories: [
        'Car',
        'Car Insurance',
        'Car Repair',
        'Car Leasing',
        'Parking',
      ],
    },
    {
      src: homeIcon,
      title: 'Home',
      subCategories: ['Tools', 'Furniture', 'House and Garden', 'Repairs'],
    },
    {
      src: shoppingIcon,
      title: 'Shopping',
      subCategories: [
        'Electronics',
        'Clothes',
        'Body Care',
        'Accessories',
        'Education',
        'Pets',
        'Health Care',
        'Children',
        'Gifts',
      ],
    },
    {
      src: feesIcon,
      title: 'Fees',
      subCategories: [
        'Internet Bill',
        'Phone Bill',
        'Tax',
        'Mandate',
        'Streaming Services',
        'Subscription Services',
        'Car Fee',
        'Bank Loans',
        'Health Insurance',
        'Electricity Bill',
        'Rent',
      ],
    },
    {
      src: entertainmentIcon,
      title: 'Entertainment',
      subCategories: [
        'Alcohol',
        'Events',
        'Sports',
        'Motorcycle',
        'Bike',
        'Books',
        'Hobby',
        'Holidays',
        'Software, Games',
      ],
    },
    {
      src: otherIcon,
      title: 'Other',
      subCategories: [
        'Sale',
        'Taxi',
        'Public Transport',
        'Long Distance Transport',
      ],
    },
  ];
  const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);
  const [categoryObj, setCategoryObj] = useState(null);

  const closeModalHandler = () =>
    setIsSelectCategoryOpen((snapshot) => !snapshot);

  const openSubCategoryModalHandler = (subCategoryObj) => {
    setCategoryObj(subCategoryObj);
    setIsSubCategoryModalOpen((snapshot) => !snapshot);
  };
  return (
    <Modal>
      {isSubCategoryModalOpen && (
        <SubCategoryModal
          {...categoryObj}
          setIsSubCategoryModalOpen={setIsSubCategoryModalOpen}
          setIsSelectCategoryOpen={setIsSelectCategoryOpen}
        />
      )}
      <Header>
        <BackButton onClick={closeModalHandler}>
          <Icon src={BackIcon} />
        </BackButton>
        <Heading>Select</Heading>
      </Header>
      {mainCategories.map(({ src, title, subCategories }) => (
        <CategoryButton
          key={title}
          onClick={() => openSubCategoryModalHandler({ subCategories, src })}
        >
          <IconContainer>
            <CategoryIcon src={src} />
          </IconContainer>
          <CategorySpan>{title}</CategorySpan>
        </CategoryButton>
      ))}
    </Modal>
  );
};

SelectCategoryModal.propTypes = {
  setIsSelectCategoryOpen: PropTypes.func,
};

export default SelectCategoryModal;
