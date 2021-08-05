import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Statistics from "../pages/Statistics/Statistics";
import MyProfile from "../pages/MyProfile";
import Main from "../pages/Main/Main";
import AppNav from "../components/Nav/Nav";
import styled from "styled-components";
import Settings from "../pages/Settings/Settings";
import Plans from "../pages/Plans/Plans";
import Header from "../components/Header/Header";
const StyledAppNav = styled(AppNav)``;

const MainTemplate = () => {
  return (
    <section>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Main} />
        </Switch>
        <Switch>
          <Route path="/plans" component={Plans} />
        </Switch>
        <Switch>
          <Route path="/statistics" component={Statistics} />
        </Switch>
        <Switch>
          <Route path="/myprofile" component={MyProfile} />
        </Switch>
        <Switch>
          <Route path="/settings" component={Settings} />
        </Switch>
        <StyledAppNav />
      </BrowserRouter>
    </section>
  );
};

export default MainTemplate;
