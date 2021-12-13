import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import AppTemplate from '@Components/templates/AppTemplate'

import AddBillModal from '@Modals/AddBillModal'
import AddExpensesModal from '@Modals/AddExpensesModal'
import UpdateEarningsModal from '@Modals/UpdateEarningsModal'

import ExepensesPage from '@Pages/ExpensesPage'
import StatisticsPage from '@Pages/StatisticsPage'
import ResetPasswordPage from '@Pages/ResetPasswordPage'
import LoginPage from '@Pages/LoginPage'
import SignupPage from '@Pages/SignupPage'
import MainPage from '@Pages/MainPage'
import SetupAccountPage from '@Pages/SetupAccountPage'

import { useUi } from '@Hooks/useUi'
import { useFirestore } from '@Hooks/useFirestore'

import PrivateRoute from '@/PrivateRoute'

const App: React.FC = () => {
  const { isEarningsModalOpen, isBillModalOpen, isExpensesModalOpen } = useUi()

  const { isConfigured } = useFirestore()

  // @HACK for 100vh problem on phones (url bar not included in 100vh)
  useEffect(() => {
    const fixMobileHeight = () => {
      const appHeight = () => {
        const doc = document.documentElement
        doc.style.setProperty('--app-height', `${window.innerHeight}px`)
      }
      window.addEventListener('resize', appHeight)
      appHeight()
    }

    fixMobileHeight()
  }, [])

  return (
    <Router>
      {isBillModalOpen && <AddBillModal />}
      {isEarningsModalOpen && <UpdateEarningsModal />}
      {isExpensesModalOpen && <AddExpensesModal />}
      <Switch>
        <PrivateRoute
          exact
          path="/setup"
          component={() => <SetupAccountPage />}
        />
        <PrivateRoute
          exact
          path="/"
          component={() =>
            isConfigured ? (
              <AppTemplate>
                <MainPage />
              </AppTemplate>
            ) : (
              <Redirect to="/setup" />
            )
          }
        />
        <PrivateRoute
          exact
          path="/expenses"
          component={() => (
            <AppTemplate>
              <ExepensesPage />
            </AppTemplate>
          )}
        />
        <PrivateRoute
          exact
          path="/statistics"
          component={() => (
            <AppTemplate>
              <StatisticsPage />
            </AppTemplate>
          )}
        />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/reset-password" component={ResetPasswordPage} />
      </Switch>
    </Router>
  )
}

export default App
