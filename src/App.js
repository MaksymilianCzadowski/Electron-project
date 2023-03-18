import { RouterProvider } from "react-router-dom";
import router from "./config/router";
import Layout from "./components/layout/MainLayout";
import AuthLayout from "./components/layout/AuthLayout";
import { useSelector } from "react-redux";

function App() {
  const { isLogged } = useSelector((state) => state.user);
 

  return (
    <>
      {isLogged ? (
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      ) : (
        <AuthLayout>
          <RouterProvider router={router} />
        </AuthLayout>
      )}
    </>
  );
}

export default App;
