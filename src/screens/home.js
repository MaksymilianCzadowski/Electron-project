import React from "react";
import Layout from "../components/layout/MainLayout";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Layout>
        <Link to="/register">Register</Link>
      </Layout>
    </div>
  );
};

export default Home;
