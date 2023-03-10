import { Fragment } from "react";
import { Route } from "react-router-dom";
import DummyScreen from "./components/pages/DummyScreen";
import ExpenseForm from "./components/signup/ExpenseForm";
import CompleteProfile from "./components/pages/CompleteProfile";
import EmailVerification from "./components/pages/EmailVerification";
import ForgotPassword from "./components/pages/ForgotPassword";
import Expenses from "./components/pages/Expenses";
import Header from "./components/Header";


function App() {
 
  return (
    <Fragment >
    <Header/>
   <Route path="/" exact>
        <ExpenseForm />
      </Route>   
        <Route path="/DummyScreen" exact>
        <DummyScreen />
      </Route>
      <Route path="/CompleteProfile" exact>
        <CompleteProfile />
      </Route>
      <Route path="/EmailVerification" exact>
        <EmailVerification/>
      </Route>
      <Route path="/ForgotPassword" exact>
        <ForgotPassword/>
      </Route>
      <Route path="/Expenses" exact>
        <Expenses/>
      </Route>
    </Fragment>
  );
}

export default App;