const LoginForm = () => {
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={() => {}}>
        <div>
          <label htmlFor="loginUser">Username</label>
          <input
            type="text"
            name="username"
            id="loginUsername"
            onChange={() => {}}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="loginPassword">Password</label>
          <input
            type="password"
            name="password"
            id="loginPassword"
            onChange={() => {}}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};
