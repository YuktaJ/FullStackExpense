import { useEffect, useState } from "react";
import AuthContext from "./auth-context";

const AuthContextProvider = (props) => {
  const [token, setToken] = useState();
  const [isPremium, setIsPremium] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      setIsLoggedIn(true);
    }
  }, []);

  const logInHandler = (token) => {
    setToken(token);
    setIsLoggedIn(true);
  };

  const logOutHandler = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
  };
  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
  function premiumHandler() {
    setIsPremium(true);
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      let parsedToken = parseJwt(token);
      if (parsedToken.isPremium) {
        setIsPremium(true);
      }
    }
  }, [logOutHandler]);
  return (
    <AuthContext.Provider
      value={{
        token: token,
        isLoggedIn: isLoggedIn,
        logIn: logInHandler,
        logOut: logOutHandler,
        isPremium: isPremium,
        premium: premiumHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
