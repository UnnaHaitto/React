import { useState, useEffect } from "react";
import { fetchData } from "../utils/fetchData";
import { useNavigate } from "react-router";

const UPLOAD_API = import.meta.env.VITE_UPLOAD_SERVER;
const AUTH_API = import.meta.env.VITE_AUTH_API;
const MEDIA_API = import.meta.env.VITE_MEDIA_API;

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getMedia = async (/*limit*/) => {
      try {
        /*
        const json = await fetchData(
          import.meta.env.VITE_MEDIA_API + "/media?limit=" + limit,
        );*/

        const json = await fetchData(MEDIA_API + "/media");

        const newArray = await Promise.all(
          json.map(async (item) => {
            const result = await fetchData(AUTH_API + "/users/" + item.user_id);
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

  const postMedia = async (file, inputs, token) => {
    const mediaData = {
      title: inputs.title,
      description: inputs.description,
      filename: file.filename,
      media_type: file.media_type,
      filesize: file.filesize,
    };

    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(mediaData),
    };

    const mediaResponse = await fetchData(MEDIA_API + "/media", data);

    return mediaResponse;
  };

  const deleteMedia = async (id, token) => {
    const data = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const response = await fetchData(MEDIA_API + "/media/" + id, data);

    navigate(0);

    return response;
  };

  const modifyMedia = async (id, inputs, token) => {
    const data = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(inputs),
    };

    const response = await fetchData(MEDIA_API + "/media/" + id, data);

    navigate(0);

    return response;
  };

  return { mediaArray, postMedia, deleteMedia, modifyMedia };
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

    const loginResult = await fetchData(AUTH_API + "/auth/login", fetchOptions);

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

    const response = await fetch(AUTH_API + "/users/token", data);

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

    const response = await fetch(AUTH_API + "/users", data);

    const userData = await response.json();

    return userData;
  };

  return { getUserByToken, postUser };
};

const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append("file", file);

    const data = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    };

    const fileData = await fetchData(UPLOAD_API + "/upload", data);

    return fileData;
    // TODO: create FormData object
    // TODO: add file to FormData
    // TODO: upload the file to file server and get the file data, use upload api endpoint
    // - add authorization header with token, content-type is set automatically when using FormData
    // TODO: return the file data.
  };

  return { postFile };
};

const useLikes = () => {
  const [likeArray, setLikeArray] = useState([]);

  const navigate = useNavigate();

  const postLike = async (token, mediaId) => {
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ media_id: mediaId }),
    };

    const response = await fetchData(MEDIA_API + "/likes", data);

    navigate(0);

    return response;
  };

  const deleteLike = async (likeId, token) => {
    const data = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const response = await fetchData(MEDIA_API + "/likes/" + likeId, data);

    navigate(0);

    return response;
  };

  const getLikeCountByMediaId = async (mediaId) => {
    const response = await fetchData(MEDIA_API + "/likes/count/" + mediaId);

    setLikeArray(response);

    return response;
  };

  const getLikeByUser = async (userId, token) => {
    const data = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const response = await fetchData(
      MEDIA_API + "/likes/byuser/" + userId,
      data,
    );

    return response;
  };

  return {
    likeArray,
    postLike,
    deleteLike,
    getLikeByUser,
    getLikeCountByMediaId,
  };
};

export { useMedia, useAuthentication, useUser, useFile, useLikes };
