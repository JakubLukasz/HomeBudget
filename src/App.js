import React,{useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from '@Components/atoms/PrivateRoute';
import AppTemplate from '@Components/templates/AppTemplate';
import SetupTemplate from '@Components/templates/SetupTemplate';
import ResetPassword from '@Pages/ResetPassword';
import Login from '@Pages/Login';
import Signup from '@Pages/Signup';

const App = () => {
  // fix for 100vh problem on phones (url bar not included in 100vh)

  useEffect(() => {
    const fixMobileHeight = () => {
      const appHeight = () => {
        const doc = document.documentElement;
        doc.style.setProperty('--app-height', `${window.innerHeight}px`);
      };
      window.addEventListener('resize', appHeight);
      appHeight();
    };

    fixMobileHeight();
  },[])
  return (
    <SetupTemplate>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={AppTemplate} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/reset-password" component={ResetPassword} />
        </Switch>
      </Router>
    </SetupTemplate>
  );
};

export default App;
