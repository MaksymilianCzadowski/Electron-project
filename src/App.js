import { RouterProvider } from "react-router-dom";
import router from "./config/router";
import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./components/layout/AuthLayout";
import { useSelector } from "react-redux";
import { initializeApp } from 'firebase/app';
import styled from "styled-components";

function App() {
  const { isLogged } = useSelector((state) => state.user);
  // const  isLogged  = true;

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);
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
