import { useEffect } from "react";
import { useUserContext } from "../hooks/contextHooks";

const Logout = () => {
  const { handleLogout } = useUserContext();

  const doLogout = async () => {
    if (localStorage.getItem("token")) {
      try {
        await handleLogout();
        return;
      } catch (error) {
        alert(error.message);
      }
    }

    console.log("Not logged in");
  };

  useEffect(() => {
    doLogout();
  }, []);
};

export default Logout;
