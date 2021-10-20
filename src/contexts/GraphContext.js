import React, { createContext, useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import PropTypes from 'prop-types';
import { currentDate } from '../helpers/currentDate';

export const GraphContext = createContext({});

export const GraphContextProvider = ({ children }) => {
  const { getTransactions } = useFirestore();
  const [transactions, setTransactions] = useState([]);
  const [spentTransactions, setSpentTransactions] = useState([]);
  const [earnedTransactions, setEarnedTransactions] = useState([]);
  const [spentMonthTransactions, setSpentMonthTransactions] = useState([]);
  const [earnedMonthTransactions, setEarnedMonthTransactions] = useState([]);
  const [earnedCategoryData, setEarnedCategoryData] = useState(null);
  const [spentCategoryData, setSpentCategoryData] = useState(null);
  const [spentMonthCategoryData, setSpentMonthCategoryData] = useState(null);
  const [earnedMonthCategoryData, setEarnedMonthCategoryData] = useState(null);

  const generateRandomColor = () => {
    let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };

  const colors = [
    '#011627',
    '#2a3f63',
    '#58A9CC',
    '#e87a13',
    '#66e028',
    '#b71cd6',
    '#5c47e6',
    '#e0e332',
    '#e32f29',
    '#21de6a',
  ].concat(generateRandomColor);

  const createDoughnut = (labels, data) => {
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          hoverOffset: 4,
        },
      ],
    };
  };

  const setupDoughnut = (dataArray, func) => {
    const labels = dataArray.map(({ category }) => category);
    const data = dataArray.map(({ amount }) => amount);
    func(createDoughnut(labels, data));
  };

  const setupMonthStatistics = (spentData, earnedData) => {
    const { currentMonth } = currentDate();
    const spentMonthData = spentData.filter(
      ({ date }) => date.split('-')[1] === currentMonth
    );
    setSpentMonthTransactions(spentMonthData);
    const earnedMonthData = earnedData.filter(
      ({ date }) => date.split('-')[1] === currentMonth
    );
    setEarnedMonthTransactions(earnedMonthData);
    const spentMonthArray = groupArrayByCategory(spentMonthData);
    const earnedMonthArray = groupArrayByCategory(earnedMonthData);
    return { spentMonthArray, earnedMonthArray };
  };

  const handleTransactions = (transactions) => {
    setTransactions(transactions);
    const spentTransactionsData = transactions.filter(({ isSpent }) => isSpent);
    setSpentTransactions(spentTransactionsData);
    const earnedTransactionsData = transactions.filter(
      ({ isSpent }) => !isSpent
    );
    setEarnedTransactions(earnedTransactionsData);
    const spentCategoryArray = groupArrayByCategory(spentTransactionsData);
    const earnedCategoryArray = groupArrayByCategory(earnedTransactionsData);
    const { spentMonthArray, earnedMonthArray } = setupMonthStatistics(
      spentTransactionsData,
      earnedTransactionsData
    );
    setupDoughnut(spentCategoryArray, setSpentCategoryData);
    setupDoughnut(earnedCategoryArray, setEarnedCategoryData);
    setupDoughnut(spentMonthArray, setSpentMonthCategoryData);
    setupDoughnut(earnedMonthArray, setEarnedMonthCategoryData);
  };

  const groupArrayByCategory = (rawArray) => {
    const array = [];
    rawArray.forEach(({ category, amount }) =>
      array.push({ category, amount })
    );
    const result = [];
    array.reduce((res, value) => {
      if (!res[value.category]) {
        res[value.category] = {
          category: value.category,
          amount: 0,
        };
        result.push(res[value.category]);
      }
      res[value.category].amount += value.amount;
      return res;
    }, {});

    return result;
  };

  const initGraph = async () => {
    const transactions = await getTransactions();
    handleTransactions(transactions);
  };

  const ctx = {
    initGraph,
    transactions,
    spentTransactions,
    earnedTransactions,
    spentMonthTransactions,
    earnedMonthTransactions,
    earnedCategoryData,
    spentCategoryData,
    spentMonthCategoryData,
    earnedMonthCategoryData,
  };

  return <GraphContext.Provider value={ctx}>{children}</GraphContext.Provider>;
};

GraphContextProvider.propTypes = {
  children: PropTypes.node,
};
