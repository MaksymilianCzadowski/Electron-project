import { RouterProvider } from "react-router-dom";
import router from "./config/router";
import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./components/layout/AuthLayout";
import { useSelector } from "react-redux";
import styled from "styled-components";

function App() {
  const { isLogged } = useSelector((state) => state.user);
  // const  isLogged  = true;

  return (
    <Wrapper>
      {isLogged ? (
        <MainLayout>
          <RouterProvider router={router} />
        </MainLayout>
      ) : (
        <AuthLayout>
          <RouterProvider router={router} />
        </AuthLayout>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

export default App;
