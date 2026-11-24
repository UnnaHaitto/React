import { NavLink, Outlet } from "react-router";
import { useUserContext } from "../hooks/contextHooks";

const Layout = (props) => {
  const { user } = useUserContext();

  return (
    <div>
      <header>
        <h1 className="font-bold text-2xl m-1">My application</h1>
        <nav>
          <ul className="list-none p-0 m-0 overflow-hidden bg-gray-900 flex justify-end">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {user ? (
              <>
                <li>
                  <NavLink to="/upload">Upload</NavLink>
                </li>
                <li>
                  <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/logout">Logout</NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </header>
    </div>
  );
};

Layout.propTypes = {};

export default Layout;
