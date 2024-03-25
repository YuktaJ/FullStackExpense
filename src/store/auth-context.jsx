import { createContext } from "react";

const defaultContext = {
  token: null,
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
  isPremium: false,
  premium: () => {},
};

const AuthContext = createContext(defaultContext);
export default AuthContext;
