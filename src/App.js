import React from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AppTemplate from './templates/AppTemplate';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/atoms/PrivateRoute';
import ResetPassword from './pages/ResetPassword';
import SetupTemplate from './templates/SetupTemplate';

// fix for 100vh problem on phones (url bar not included in 100vh)
const fixMobileHeight = () => {
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  };
  window.addEventListener('resize', appHeight);
  appHeight();
};

const App = () => {
  fixMobileHeight();
  return (
    <SetupTemplate>
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={AppTemplate} />
        </Switch>
        <Switch>
          <Route path="/signup" component={Signup} />
        </Switch>
        <Switch>
          <Route path="/login" component={Login} />
        </Switch>
        <Switch>
          <Route path="/reset-password" component={ResetPassword} />
        </Switch>
      </BrowserRouter>
    </SetupTemplate>
  );
};

export default App;
