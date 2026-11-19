import { createContext, useState, useEffect } from "react";
import { useAuthentication, useUser } from "../hooks/apiHooks";
import { useLocation, useNavigate } from "react-router";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { postLogin } = useAuthentication();
  const { getUserByToken } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // login, logout and autologin functions are here instead of components
  const handleLogin = async (credentials) => {
    try {
      const userData = await postLogin(credentials);
      setUser(userData);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.clear();
      setUser(null);
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  // handleAutoLogin is used when the app is loaded to check if there is a valid token in local storage
  const handleAutoLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const user = await getUserByToken(token);
        setUser(user);

        console.log("location: ", location);
        navigate(location.pathname);
      }
      // TODO: get token from local storage
      // TODO: if token exists, get user data from API
      // TODO: set user to state
      // TODO: navigate to home
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, handleLogin, handleLogout, handleAutoLogin }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserProvider, UserContext };
