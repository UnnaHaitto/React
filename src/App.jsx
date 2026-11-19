import { Route, BrowserRouter, Routes, Router } from "react-router";
import Layout from "./components/Layout";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Upload from "./views/Upload";
import Single from "./views/Single";
import Login from "./views/Login";
import Logout from "./views/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserProvider } from "./contexts/UserContext";

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <Upload />
                </ProtectedRoute>
              }
            />
            <Route path="/single" element={<Single />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/home" element={<Home />}></Route>
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
