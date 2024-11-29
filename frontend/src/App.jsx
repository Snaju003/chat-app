import "./App.css";
import ChatHome from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="h-screen w-screen">
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ChatHome />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
