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

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user])

  const handleClick = () => {
    logout();
    dispatch(handleLogout())
    navigate("/");
  };

  return (
    <div>
      <Link to="/register">Register</Link>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default Home;
