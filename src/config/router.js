import { createBrowserRouter } from "react-router-dom";
import Home from "../screens/home";
import Register from "../screens/auth/register";
import Login from "../screens/auth/login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/register",
        element: <Register />
    },
])

export default router;