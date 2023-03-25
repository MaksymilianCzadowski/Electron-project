import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector, useDispatch } from "react-redux";
import { handleLogout } from "../slices/userSlice";
import styled from "styled-components";
import Channel from "../components/Channel";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const { user } = useSelector((state) => state.user);



  const handleClickLogout = () => {
    logout();
    dispatch(handleLogout());
    navigate("/");
  };

  return (
    <Wrapper>
      <Container>
        <MessagesWrapper>
          <Channel user={user} />
        </MessagesWrapper>
      </Container>
      {/* <button onClick={handleClickLogout}>Logout</button> */}
    </Wrapper>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: center;
  justify-content: center;
  background-color: red;
  width: 100%;
  height: 100%;
`;



const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const MessagesWrapper = styled.div`
  background-color: #313338;
  width: 100%;
`;

export default Home;
