import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import GoogleLoginButton from "./components/GoogleLoginButton";
import { initGoogleAuth } from "./utils/GoogleAuth";
import { useEffect } from "react";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    initGoogleAuth();
  }, []);

  return (

      <Routes>
        <Route path="/" element={!user ? <GoogleLoginButton /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>

  );
}

export default App;
