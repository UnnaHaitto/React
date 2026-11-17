import { useState, useEffect } from "react";
import { fetchData } from "../utils/fetchData";
import { useNavigate } from "react-router";

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const json = await fetchData(import.meta.env.VITE_MEDIA_API + "/media");

        const newArray = await Promise.all(
          json.map(async (item) => {
            const result = await fetchData(
              import.meta.env.VITE_AUTH_API + "/users/" + item.user_id,
            );
            return { ...item, username: result.username };
          }),
        );

        setMediaArray(newArray);
      } catch (error) {
        console.log(error.message);
      }
    };

    getMedia();
  }, []);

  return { mediaArray };
};

const useAuthentication = () => {
  const navigate = useNavigate();

  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    };

    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + "/auth/login",
      fetchOptions,
    );
    console.log(loginResult);

    console.log("token:", loginResult.token);

    localStorage.setItem("token", loginResult.token);

    navigate("/");

    return loginResult;
  };

  return { postLogin };
};

const useUser = () => {
  const getUserByToken = async (token) => {
    try {
      const response = await fetch(
        "https://media2.edu.metropolia.fi/restaurant/api/v1/users/token",
        token,
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("error: ", error);
        throw new Error("Unable to get user data!");
      }

      const userData = await response.json();

      return userData;
    } catch (error) {
      console.log(error.message);
    }
  };

  return { getUserByToken };
};

export { useMedia, useAuthentication, useUser };
