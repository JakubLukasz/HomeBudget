import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import CarIcon from '@mui/icons-material/DirectionsCarFilled';
import HomeIcon from '@mui/icons-material/Home';
import FoodIcon from '@mui/icons-material/RestaurantMenu';
import FeesIcon from '@mui/icons-material/AttachMoney';
import ShoppingIcon from '@mui/icons-material/ShoppingBag';
import PaydayIcon from '@mui/icons-material/LocalAtm';
import EntertainmentIcon from '@mui/icons-material/Person';
import OtherIcon from '@mui/icons-material/Circle';
import ExpenseIcon from '@mui/icons-material/Assignment';

export const InputDataContext = createContext({});

export const InputDataContextProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('Not Selected...');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [subCategories, setSubCategories] = useState(null);

  const mainCategories = [
    {
      Icon: FoodIcon,
      title: 'Food',
      subCategories: ['Groceries', 'Bar, Cafe', 'Restaurant'],
    },
    {
      Icon: CarIcon,
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
      Icon: HomeIcon,
      title: 'Home',
      subCategories: ['Tools', 'Furniture', 'House and Garden', 'Repairs'],
    },
    {
      Icon: ShoppingIcon,
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
      Icon: FeesIcon,
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
      Icon: EntertainmentIcon,
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
      Icon: OtherIcon,
      title: 'Other',
      subCategories: [
        'Sale',
        'Taxi',
        'Public Transport',
        'Long Distance Transport',
      ],
    },
  ];
  const getSubCategories = (title) => {
    const { subCategories } = mainCategories.find(
      (category) => category.title === title
    );
    return subCategories;
  };

  const monthNames = [
    {
      id: '01',
      value: 'January',
    },
    {
      id: '02',
      value: 'February',
    },
    {
      id: '03',
      value: 'March',
    },
    {
      id: '04',
      value: 'April',
    },
    {
      id: '05',
      value: 'May',
    },
    {
      id: '06',
      value: 'June',
    },
    {
      id: '07',
      value: 'July',
    },
    {
      id: '08',
      value: 'August',
    },
    {
      id: '09',
      value: 'September',
    },
    {
      id: '10',
      value: 'October',
    },
    {
      id: '11',
      value: 'November',
    },
    {
      id: '12',
      value: 'December',
    },
  ];

  const getCategoryIcon = (title) => {
    switch (title) {
      case 'Car':
        return CarIcon;
      case 'Home':
        return HomeIcon;
      case 'Food':
        return FoodIcon;
      case 'Fees':
        return FeesIcon;
      case 'Shopping':
        return ShoppingIcon;
      case 'Entertainment':
        return EntertainmentIcon;
      case 'Other':
        return OtherIcon;
      case 'Payday':
        return PaydayIcon;
      case 'Expense':
        return ExpenseIcon;
    }
  };

  const getMonthNames = (array) => {
    const tmp = [];
    array.forEach((month) => {
      monthNames.forEach(({ id, value }) => {
        if (month === id) tmp.push(value);
      });
    });
    return tmp;
  };

  const ctx = {
    selectedCategory,
    setSelectedCategory,
    selectedGroup,
    setSelectedGroup,
    mainCategories,
    getMonthNames,
    getSubCategories,
    getCategoryIcon,
    subCategories,
    setSubCategories,
  };

  InputDataContextProvider.propTypes = {
    children: PropTypes.node,
  };

  return (
    <InputDataContext.Provider value={ctx}>
      {children}
    </InputDataContext.Provider>
  );
};
