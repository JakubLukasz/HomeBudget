import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Statistics from '../pages/Statistics';
import Main from '../pages/Main';
import React from 'react';
import AppNav from '../components/organisms/Nav';
import { useUi } from '../hooks/useUi';
import AddBillModal from '../components/organisms/AddBillModal';
import { useFirestore } from '../hooks/useFirestore';
import SetupAccount from '../components/organisms/SetupAccount';
import Expenses from '../pages/Expenses';
import styled from 'styled-components';
import { devices } from '../assets/styles/devices';
import AddExpensesModal from '../components/organisms/AddExpensesModal';
import SubCategoryModal from '../components/organisms/SubCategoryModal';
import SelectCategoryModal from '../components/organisms/SelectCategoryModal';

const Container = styled.div`
  max-width: 100vw;
  height: var(--app-height);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media ${devices.laptop} {
    flex-direction: row-reverse;
  }
`;

const AppTemplate = () => {
  const {
    isBillModalOpen,
    isExpensesModalOpen,
    isSubCategoryModalOpen,
    isCategoryModalOpen,
  } = useUi();
  const { isConfigured } = useFirestore();
  return (
    <Container>
      <BrowserRouter>
        {isBillModalOpen && <AddBillModal />}
        {isExpensesModalOpen && <AddExpensesModal />}
        {!isConfigured && <SetupAccount />}
        {isCategoryModalOpen && <SelectCategoryModal />}
        {isSubCategoryModalOpen && <SubCategoryModal />}
        <Switch>
          <Route exact path="/" component={Main} />
        </Switch>
        <Switch>
          <Route path="/expenses" component={Expenses} />
        </Switch>
        <Switch>
          <Route path="/statistics" component={Statistics} />
        </Switch>
        <AppNav />
      </BrowserRouter>
    </Container>
  );
};

export default AppTemplate;
