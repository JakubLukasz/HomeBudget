import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Statistics from '../pages/Statistics';
import Main from '../pages/Main';
import React from 'react';
import AppNav from '../components/Nav';
import { useAddBill } from '../hooks/useAddBill';
import AddBillModal from '../components/modals/AddBillModal';
import { useFirestore } from '../hooks/useFirestore';
import { useLoading } from '../hooks/useLoading';
import LoadingScreen from '../components/LoadingScreen';
import SetupAccount from '../components/SetupAccount';
import FixedExpenses from '../pages/FixedExpenses';
import styled from 'styled-components';
import { devices } from '../assets/styles/devices';

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
  const { isModalOpen } = useAddBill();
  const { isConfigured } = useFirestore();
  const { isLoading } = useLoading();
  return (
    <Container>
      <BrowserRouter>
        {isModalOpen && <AddBillModal />}
        {!isConfigured && <SetupAccount />}
        {isLoading && <LoadingScreen />}
        <Switch>
          <Route exact path="/" component={Main} />
        </Switch>
        <Switch>
          <Route path="/fixed-expenses" component={FixedExpenses} />
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
