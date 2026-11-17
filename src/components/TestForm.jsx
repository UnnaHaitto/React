import { useState } from "react";

const TestFrom = () => {
  const [username, setUsername] = useState("");

  const handleChange = (event) => {
    console.log(event.target.value);

    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Lähetetään: ", username);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Test form</h3>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleChange}
        />
        <button type="submit">Lähetä käyttäjä</button>
      </form>
    </div>
  );
};

export default TestFrom;
