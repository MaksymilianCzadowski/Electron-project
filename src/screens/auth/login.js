import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../../hooks/useAuth";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import Cookies from "js-cookie";
import { fetchUser } from "../../utils/user";
import { useDispatch } from 'react-redux';
import { handleLogin } from '../../slices/userSlice';

const Login = () => {
  const navigate = useNavigate();


  const dispatch = useDispatch();

  const [email, setEmail] = useState("czadomax@gmail.com");
  const [password, setPassword] = useState("azerty");

  const { login, token, isLoadind, isError } = useAuth(email, password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login();
  };

  const handleClick = () => {
    navigate("/register");
  };

  useEffect(() => {
    if (token) {
      Cookies.set("token", token);
      fetchUser(email).then((userData) => {
        dispatch(handleLogin(userData));
        navigate("/home");
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [dispatch, email, token, navigate]);

  return (
    <Wrapper>
      <h2>Welcome back!</h2>
      <FormContainer>
        {isLoadind && <h3>Loading...</h3>}
        <form className="boxFormRegister" onSubmit={(e) => handleSubmit(e)}>
          <Input
            label="Email"
            type="email"
            required={true}
            maxLength="50"
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoadind}
          />

          <Input
            label="Password"
            type="password"
            required={true}
            minLength="6"
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoadind}
          />

          <Button type="submit" title="Log In" />
          <NewAccountDiv>
            <p>
              Need an account?{" "}
              <NewAccountLink onClick={() => handleClick()}>
                Register
              </NewAccountLink>
            </p>
          </NewAccountDiv>
        </form>
        {isError && <ErrorMessage>Somethong went wrong</ErrorMessage>}
      </FormContainer>
      <button onClick={(e) => handleSubmit(e)}>DEV LOGIN</button>
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

const NewAccountDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: #82848b;
  font-size: 14px;
`;

const NewAccountLink = styled.a`
  color: #00a6f9;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`;

export default Login;
