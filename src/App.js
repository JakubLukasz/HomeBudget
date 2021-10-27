import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import AppTemplate from './templates/AppTemplate';
import SetupTemplate from './templates/SetupTemplate';

import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import ResetPasswordPage from './pages/ResetPassword';
import StatisticsPage from './pages/Statistics';
import MainPage from './pages/Main';
import ExpensesPage from './pages/Expenses';

import AddBillModal from './modals/AddBillModal';
import SetupAccount from './modals/SetupAccount';
import AddExpensesModal from './modals/AddExpensesModal';
import SubCategoryModal from './modals/SubCategoryModal';
import SelectCategoryModal from './modals/SelectCategoryModal';

import { useFirestore } from './hooks/useFirestore';
import { useUi } from './hooks/useUi';
import { useAuth } from './hooks/useAuth';

// @HACK fix for 100vh problem on phones (url bar not included in 100vh)
const fixMobileHeight = () => {
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  };
  window.addEventListener('resize', appHeight);
  appHeight();
};

const App = () => {
  React.useEffect(() => {
    fixMobileHeight();
  }, [])

  const {
    isBillModalOpen,
    isExpensesModalOpen,
    isSubCategoryModalOpen,
    isCategoryModalOpen,
  } = useUi();

  const { currentUser } = useAuth();
  const { isConfigured } = useFirestore();

  return (
    <SetupTemplate>
      <Router>
        {isBillModalOpen && <AddBillModal />}
        {isExpensesModalOpen && <AddExpensesModal />}
        {currentUser && !isConfigured && <SetupAccount />}
        {isCategoryModalOpen && <SelectCategoryModal />}
        {isSubCategoryModalOpen && <SubCategoryModal />}
        <PrivateRoute exact path="/" component={() => (
          <AppTemplate>
            <MainPage />
          </AppTemplate>
        )}
        />
        <PrivateRoute exact path="/expenses" component={() => (
          <AppTemplate>
            <ExpensesPage />
          </AppTemplate>
        )}
        />
        <PrivateRoute exact path="/statistics" component={() => (
          <AppTemplate>
            <StatisticsPage />
          </AppTemplate>
        )}
        />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/reset-password" component={ResetPasswordPage} />
      </Router>
    </SetupTemplate>
  );
};

export default App;
