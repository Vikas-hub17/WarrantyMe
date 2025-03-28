import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #6a11cb, #2575fc);
`;

const LoginCard = styled.div`
  background: white;
  padding: 40px;
  width: 400px;
  border-radius: 12px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => (props.success ? "green" : "red")};
  margin-bottom: 15px;
`;

const Login = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("user");
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <Container>
      <LoginCard>
        {message && <Message success={message.includes("✅")}>{message}</Message>}
        <Title>Welcome to MyApp</Title>
        <Subtitle>Sign in to continue</Subtitle>
        <GoogleLoginButton setMessage={setMessage} message={message} />
      </LoginCard>
    </Container>
  );
};

export default Login;
