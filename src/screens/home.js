import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector, useDispatch } from 'react-redux'
import { handleLogout } from '../slices/userSlice';


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout} = useAuth();
  const { user } = useSelector(state => state.user);

  const handleClickLogout = () => {
    logout();
    dispatch(handleLogout())
    navigate("/");
  };

  return (
    <div>
      <button onClick={handleClickLogout}>Logout</button>
    </div>
  );
};

export default Home;
