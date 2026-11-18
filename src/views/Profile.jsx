import { useEffect, useState } from "react";
import { useUser } from "../hooks/apiHooks";

const Profile = (props) => {
  const [userData, setUserData] = useState("");

  const { getUserByToken } = useUser();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (token) {
          console.log("Token: ", token);
          const data = await getUserByToken(token);
          setUserData(data);
          console.log("getUserData: ", data);

          //console.log(userData.user.email);
        } else {
          console.log("not logged in");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    getUserData();
  }, [token]);

  return (
    <div>
      <h1>Profile</h1>
      {token ? (
        userData ? (
          <>
            <h2>{userData.user.username}</h2>
            <p>{userData.user.email}</p>
            <p>Created at: {userData.user.created_at}</p>
            <p>User type: {userData.user.level_name}</p>
          </>
        ) : (
          <h2>Fetching user data...</h2>
        )
      ) : (
        <h2>Not logged in</h2>
      )}
    </div>
  );
};

/*  const { postLogin } = useAuthentication();

  const doLogin = async (formData) => {
    console.log("HOOKIN palauttama formdata:", formData);

    postLogin(formData);
  }; */

Profile.propTypes = {};

export default Profile;
