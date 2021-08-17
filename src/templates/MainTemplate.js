import { BrowserRouter, Switch, Route } from "react-router-dom";
import Statistics from "../pages/Statistics/Statistics";
import MyProfile from "../pages/MyProfile";
import Main from "../pages/Main/Main";
import AppNav from "../components/Nav";
import { useAddBill } from "../contexts/AddBillContext";
import AddBillPopup from "../components/AddBillPopup";
import { useFirestore } from "../contexts/FirestoreContext";
import { useLoading } from "../contexts/LoadingContext";
import LoadingScreen from "../components/LoadingScreen";
import SetupAccount from "../components/SetupAccount";
import FixedExpenses from "../pages/FixedExpenses/FixedExpenses";

const MainTemplate = () => {
  const { isPopupOpen } = useAddBill();
  const { isConfigured } = useFirestore();
  const { isLoading } = useLoading();
  return (
    <section>
      <BrowserRouter>
        {isPopupOpen && <AddBillPopup />}
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
        <Switch>
          <Route path="/myprofile" component={MyProfile} />
        </Switch>
        <AppNav />
      </BrowserRouter>
    </section>
  );
};

export default MainTemplate;
