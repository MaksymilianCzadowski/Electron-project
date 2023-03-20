import { RouterProvider } from "react-router-dom";
import router from "./config/router";
import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./components/layout/AuthLayout";
import { useSelector } from "react-redux";

function App() {
  // const { isLogged } = useSelector((state) => state.user);
  const  isLogged  = true;
 

  return (
    <>
      {isLogged ? (
        <MainLayout>
          <RouterProvider router={router} />
        </MainLayout>
      ) : (
        <AuthLayout>
          <RouterProvider router={router} />
        </AuthLayout>
      )}
    </>
  );
}

export default App;
