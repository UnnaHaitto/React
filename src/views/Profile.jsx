import { useEffect } from "react";
import { useUser } from "../hooks/apiHooks";

const Profile = (props) => {
  const { getUserByToken } = useUser();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getUserData = async () => {
      try {
        let userData = await getUserByToken(token);
        console.log("getUserData: ", userData);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    getUserData();
  });

  return (
    <div>
      <h1>Profile</h1>
      <h2></h2>
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
