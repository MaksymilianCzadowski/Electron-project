import Cookies from "js-cookie";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const navigate = useNavigate();
  const { logout} = useAuth();

  const handleClick = () => {
    logout();
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <div>
      <Link to="/register">Register</Link>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default Home;
