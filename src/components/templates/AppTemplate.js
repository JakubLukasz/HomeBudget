import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Statistics from '@Pages/Statistics';
import Main from '@Pages/Main';
import React from 'react';
import AppNav from '@Components/organisms/Nav';
import { useUi } from '@Hooks/useUi';
import AddBillModal from '@Components/organisms/AddBillModal';
import { useFirestore } from '@Hooks/useFirestore';
import SetupAccount from '@Components/organisms/SetupAccount';
import Expenses from '@Pages/Expenses';
import styled from 'styled-components';
import { devices } from '@Assets/styles/devices';
import AddExpensesModal from '@Components/organisms/AddExpensesModal';
import SubCategoryModal from '@Components/organisms/SubCategoryModal';
import SelectCategoryModal from '@Components/organisms/SelectCategoryModal';

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
