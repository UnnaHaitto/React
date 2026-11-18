import { useState } from "react";
import LoginForm from "../components/LoginForm.jsx";
import RegisterForm from "../components/RegisterForm.jsx";

const Login = () => {
  const [shownForm, changeShownFrom] = useState("login");

  const changeForm = () => {
    shownForm === "login"
      ? changeShownFrom("register")
      : changeShownFrom("login");
  };

  return (
    <>
      {shownForm === "login" ? <LoginForm /> : <RegisterForm />}

      <button onClick={changeForm}>
        Change to {shownForm === "login" ? "register" : "login"}
      </button>
    </>
  );
};

export default Login;
