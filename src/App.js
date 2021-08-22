import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainTemplate from "./templates/MainTemplate";
import SetupTemplate from "./templates/SetupTemplate";
import { AuthContextProvider } from "./contexts/AuthContext";
import { FirestoreContextProvider } from "./contexts/FirestoreContext";
import { AddBillContextProvider } from "./contexts/AddBillContext";
import { LoadingContextProvider } from "./contexts/LoadingContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from "./pages/ResetPassword";

const App = () => (
  <LoadingContextProvider>
    <AuthContextProvider>
      <FirestoreContextProvider>
        <AddBillContextProvider>
          <SetupTemplate>
            <BrowserRouter>
              <Switch>
                <PrivateRoute exact path="/" component={MainTemplate} />
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
        </AddBillContextProvider>
      </FirestoreContextProvider>
    </AuthContextProvider>
  </LoadingContextProvider>
);

export default App;
