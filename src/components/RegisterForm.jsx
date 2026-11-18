import { useForm } from "../hooks/formHooks";
import { useUser } from "../hooks/apiHooks.js";

const RegisterForm = () => {
  const initValues = {
    username: "",
    email: "",
    password: "",
  };

  const { postUser } = useUser();

  const doRegister = async (formData) => {
    console.log(formData);

    try {
      const userData = await postUser(formData);
      console.log(userData);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const { handleInputChange, handleSubmit } = useForm(doRegister, initValues);

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="registerUsername">Username</label>
          <input
            name="username"
            type="text"
            id="registerUsername"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="registerEmail">Email</label>
          <input
            name="email"
            type="email"
            id="registerEmail"
            onChange={handleInputChange}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="registerPassword">Password</label>
          <input
            name="password"
            type="password"
            id="registerPassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
