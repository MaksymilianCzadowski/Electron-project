import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, token, isLoadind, isError, errorMessage } = useAuth(
    email,
    password,
    username
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  useEffect(() => {
    if (token) {
      Cookies.set("token", token);
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <Wrapper>
      <h2>Create an account</h2>
      <FormContainer>
        {isLoadind && <h3>Loading...</h3>}
        <form className="boxFormRegister" onSubmit={(e) => handleSubmit(e)}>
          <Input
            label="Email"
            type="email"
            maxLength="50"
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoadind}
          />

          <Input
            label="Password"
            type="password"
            minLength="6"
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoadind}
          />

          <Button type="submit" title="Register" />
        </form>
        {isError && <h3>Somethong went wrong</h3>}
      </FormContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export default Login;
