import styled from 'styled-components';
import { devices } from '../../assets/styles/devices';
import Icon from '../Icon';
import SubCategoryModal from './SubCategoryModal';
import React, { useState } from 'react';
import FoodIcon from '../../assets/images/foodIcon.svg';
import CarIcon from '../../assets/images/carIcon.svg';
import HomeIcon from '../../assets/images/homeIcon.svg';
import ShoppingIcon from '../../assets/images/shoppingIcon.svg';
import FeesIcon from '../../assets/images/feesIcon.svg';
import EntertainmentIcon from '../../assets/images/entertainmentIcon.svg';
import OtherIcon from '../../assets/images/otherIcon.svg';
import PropTypes from 'prop-types';
import BackButton from '../BackButton';

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
      src: FoodIcon,
      title: 'Food',
      subCategories: ['Groceries', 'Bar, Cafe', 'Restaurant'],
    },
    {
      src: CarIcon,
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
      src: HomeIcon,
      title: 'Home',
      subCategories: ['Tools', 'Furniture', 'House and Garden', 'Repairs'],
    },
    {
      src: ShoppingIcon,
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
      src: FeesIcon,
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
      src: EntertainmentIcon,
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
      src: OtherIcon,
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
        <BackButton click={closeModalHandler} />
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
