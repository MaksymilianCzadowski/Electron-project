import { RouterProvider } from "react-router-dom";
import router from "./config/router";
import Layout from "./components/layout/MainLayout";

function App() {
  return(
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  )
}

export default App;
