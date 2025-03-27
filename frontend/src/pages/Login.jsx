import React from "react";
import styled from "styled-components";
import GoogleLoginButton from "../components/GoogleLoginButton";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
`;

const LoginBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 350px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const Divider = styled.div`
  margin: 20px 0;
  height: 1px;
  background: #ddd;
`;

const GoogleButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Login = () => {
  return (
    <LoginContainer>
      <LoginBox>
        <Title>Welcome to Your App</Title>
        <p>Sign in to continue</p>
        <Divider />
        <GoogleButtonWrapper>
          <GoogleLoginButton />
        </GoogleButtonWrapper>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
