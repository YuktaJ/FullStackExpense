import { Route, Redirect, Switch } from "react-router-dom";
import DefaultLayout from "./pages/DefaultLayout";
import Home from "./pages/Home";
import Footer from "./components/Layout/Footer";
import AuthPage from "./pages/AuthPage";
import Expense from "./pages/Expense";
import ErrorPage from "./pages/ErrorPage";
import AuthContext from "./store/auth-context";
import { useContext } from "react";
import Premium from "./pages/Premium";
import LeaderBoard from "./components/Premium/LeaderBoard";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import Files from "./pages/Files";

const App = () => {
  const { isLoggedIn, isPremium } = useContext(AuthContext);

  console.log(isLoggedIn, "Login status");
  return (
    <>
      <DefaultLayout></DefaultLayout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home"></Redirect>
        </Route>
        <Route path="/home" exact>
          <Home></Home>
        </Route>
        {!isLoggedIn && (
          <Route path="/auth">
            <AuthPage></AuthPage>
          </Route>
        )}
        <Route path="/premium">
          {isLoggedIn && <Premium></Premium>}
          {!isLoggedIn && <Redirect to="/auth"></Redirect>}
        </Route>
        <Route path="/leader-board">
          {isPremium && <LeaderBoardPage></LeaderBoardPage>}
        </Route>
        <Route path="/expenses">{isLoggedIn && <Expense></Expense>}</Route>
        <Route path="/files">{isPremium && <Files></Files>} </Route>
        <Route path="*">
          <ErrorPage></ErrorPage>
        </Route>
      </Switch>
    </>
  );
};
export default App;
