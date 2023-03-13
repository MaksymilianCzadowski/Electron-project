import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import Cookies from "js-cookie";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { register, token, isLoadind, isError } = useAuth(
    email,
    password,
    username
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };

  useEffect(() => {
    if (token) {
      Cookies.set("token", token);
      navigate("/home");
    }
  }, [navigate, token]);

  return (
    <Wrapper>
      <h2>Sign in</h2>
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
            label="Username"
            type="text"
            maxLength="20"
            onChange={(e) => setUsername(e.target.value)}
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
          <HaveAccountDiv>
            <HaveAccountLink onClick={() => navigate("/login")}>
              Already have an account?
            </HaveAccountLink>
          </HaveAccountDiv>
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
const HaveAccountLink = styled.a`
  color: #00a6f9;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const HaveAccountDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: #82848b;
  font-size: 14px;
  padding-top: 10px;
`;
export default Register;
