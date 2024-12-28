/* eslint-disable no-unused-vars */
import "./App.css";
import ChatHome from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser } = useAuthContext();
  // console.log(authUser);
  return (
    <div className="h-screen w-screen">
      <Routes>
        <Route
          path="/"
          element={authUser ? <ChatHome /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignupPage />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
