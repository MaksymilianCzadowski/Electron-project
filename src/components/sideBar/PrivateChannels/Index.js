import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { handleLogout } from "../../../slices/userSlice";
import UserList from "../../UserList";

const Index = ({children}) => {
  const dispatch = useDispatch();
  const { logout } = useAuth();

//   const navigate = useNavigate();

// TODO: faire un logout (faire un router quand on est pas login et un pour les personnes login)
  const { user } = useSelector((state) => state.user);

  const handleClickLogout = () => {
    logout();
    dispatch(handleLogout());
    // navigate("/");
  };

  return (
    <Container>
      <Wrapper>
        <p>Private Messages</p>
        {/* TODO: fetch liste des amis*/}
        <UserList currentUser={user} />
      </Wrapper>

      {/* <button onClick={handleClickLogout}>Logout</button> */}
    </Container>
  );
};

const Container = styled.div`
  width: 240px;
  background-color: #2b2d31;
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export default Index;
