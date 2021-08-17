import { createContext, useContext, useEffect, useState } from "react";
import { useFirestore } from "./FirestoreContext";

const GraphContext = createContext({});

export const useGraph = () => {
  return useContext(GraphContext);
};

export const GraphContextProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [spendDoughnutData, setSpendDoughnutData] = useState([]);
  const [spendDoughnutType, setSpendDoughnutType] = useState("");
  const [earnedDoughnutData, setEarnedDoughnutData] = useState([]);
  const [EarnedDoughnutType, setEarnedDoughnutType] = useState("");
  const colors = [
    "#58A9CC",
    "#e87a13",
    "#66e028",
    "#b71cd6",
    "#5c47e6",
    "#e0e332",
    "#e32f29",
    "#21de6a",
  ];

  /*const spent = transactions.filter(({ isSpent }) => isSpent === true);
        const earned = transactions.filter(({ isSpent }) => isSpent === false);
        const spentAmount = spent.map(({ amount }) => amount);
        const spentCategory = spent.map(({ categoryTitle }) => categoryTitle);
        const earnedAmount = earned.map(({ amount }) => amount);
        const earnedCategory = earned.map(({ categoryTitle }) => categoryTitle);
        
        setSpentData({
          labels: spentCategory,
          datasets: [
            {
              data: spentAmount,
              backgroundColor: colors,
              hoverOffset: 4,
            },
          ],
        });
        setEarnedData({
          labels: earnedCategory,
          datasets: [
            {
              data: earnedAmount,
              backgroundColor: colors,
              hoverOffset: 4,
            },
          ],
        });*/

  const GraphCtx = {
    setTransactions,
    transactions,
    earnedDoughnutData,
    spendDoughnutData,
  };

  return (
    <GraphContext.Provider value={GraphCtx}>{children}</GraphContext.Provider>
  );
};
