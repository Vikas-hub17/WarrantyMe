import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (

      <Routes>
        <Route path="/" element={!user ? <GoogleLoginButton /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>

  );
}

export default App;
