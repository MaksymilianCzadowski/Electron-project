import { createBrowserRouter } from "react-router-dom";
import Home from "../screens/home";
import Register from "../screens/auth/register";
import Login from "../screens/auth/login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    }
])

export default router;