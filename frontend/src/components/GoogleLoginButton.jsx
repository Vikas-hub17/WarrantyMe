import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../firebase/authService";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f4f4f4;
`;

const Message = styled.p`
  position: absolute;
  top: 20px;
  width: 100%;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  color: ${(props) => (props.success ? "green" : "red")};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #ddd;
  padding: 12px 18px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  color: #333;
  font-weight: 500;

  &:hover {
    background: #f8f9fa;
  }

  svg {
    margin-right: 10px;
    font-size: 24px;
  }
`;

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  // ✅ Fix: Use useEffect only once on mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("user");
    if (isAuthenticated) {
      navigate("/dashboard"); // ✅ No infinite loop
    }
  }, []); // ✅ Empty dependency array ensures it runs only once

  const handleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      if (result) {
        // 🔹 Save user info in localStorage
        localStorage.setItem("user", JSON.stringify(result.user));

        setMessage("✅ Login successful! Redirecting...");
        
        // 🔹 Redirect after delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (error) {
      setMessage("❌ Login failed. Please try again.");
    }
  };

  return (
    <Container>
      {message && <Message success={message.includes("✅")}>{message}</Message>}
      <Button onClick={handleLogin}>
        <FcGoogle /> Sign in with Google
      </Button>
    </Container>
  );
};

export default GoogleLoginButton;
