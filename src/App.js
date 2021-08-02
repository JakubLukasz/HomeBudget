import styled from "styled-components";
import Login from "./components/Login";
import Signup from './components/Signup';
import Cos from './components/Cos'
import MainTemplate from "./templates/MainTemplate/MainTemplate";
import { AuthContextProvider } from "./contexts/AuthContext";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import ResetPassword from "./components/ResetPassword";

const App = () => (
  <AuthContextProvider>
  <MainTemplate>
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={Cos}/>
      </Switch>
      <Switch>
        <Route path="/signup" component={Signup}/>
      </Switch>
      <Switch>
        <Route path="/login" component={Login} />
      </Switch>
      <Switch>
        <Route path="/reset-password" component={ResetPassword}/>
      </Switch>
    </BrowserRouter>
  </MainTemplate>
  </AuthContextProvider>
);

export default App;
