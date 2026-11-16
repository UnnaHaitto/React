import { useForm } from "../hooks/formHooks.js";
import { useAuthentication } from "../hooks/apiHooks.js";

const LoginForm = () => {
  const initValues = {
    username: "",
    password: "",
  };

  const { postLogin } = useAuthentication();

  const doLogin = async (inputs) => {
    await postLogin(inputs);
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    doLogin,
    initValues,
  );

  console.log("Inputs", inputs);

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginuser">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
