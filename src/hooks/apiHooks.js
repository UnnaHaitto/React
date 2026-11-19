import { useState, useEffect } from "react";
import { fetchData } from "../utils/fetchData";
import { useNavigate } from "react-router";

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const getMedia = async (limit) => {
      try {
        const json = await fetchData(
          import.meta.env.VITE_MEDIA_API + "/media?limit=" + limit,
        );

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

    getMedia(10);
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
    const data = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      import.meta.env.VITE_AUTH_API + "/users/token",
      data,
    );

    const userData = await response.json();

    return userData;
  };

  const postUser = async (inputData) => {
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    };

    const response = await fetch(
      import.meta.env.VITE_AUTH_API + "/users",
      data,
    );

    const userData = await response.json();

    return userData;
  };

  return { getUserByToken, postUser };
};

export { useMedia, useAuthentication, useUser };
