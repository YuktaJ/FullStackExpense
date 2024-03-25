import Signup from "../components/Authentication/Signup";
import { Route, Redirect } from "react-router-dom";
import Login from "../components/Authentication/Login";
import ForgotPassword from "../components/Authentication/ForgotPassword";

const AuthPage = () => {
  return (
    <>
      <Route path="/auth">
        <Redirect to="/auth/sign-up" />
      </Route>

      <Route path="/auth/login">
        <Login></Login>
      </Route>
      <Route path="/auth/sign-up">
        <Signup></Signup>
      </Route>
      <Route path="/auth/forgot-password">
        <ForgotPassword></ForgotPassword>
      </Route>
    </>
  );
};
export default AuthPage;
