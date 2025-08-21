import { createBrowserRouter } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Home from "../Pages/Home/Home";
import Signin from "../Pages/Signin/Signin";
import Signup from "../Pages/Signup/Signup";
import NotFound from "../Shared/NotFound/NotFound";
import ProtectRoute from "./ProtectRoute";
import AuthRoute from "./AuthRoute";
import EditeProfile from "../Pages/EditProfile/EditeProfile";
import PostDetails from "../Pages/PostDetails/PostDetails";

const router = createBrowserRouter([
    {
        path: "",
        element: <Layout />,
        children: [
            {
                index: true,
                element: (
                    <ProtectRoute>
                        <Home />
                    </ProtectRoute>
                ),
            },
            {
                path: "edit-profile",
                element: (
                    <ProtectRoute>
                        <EditeProfile />
                    </ProtectRoute>
                ),
            },
            {
                path: "post-details/:id",
                element: (
                    <ProtectRoute>
                        <PostDetails />
                    </ProtectRoute>
                ),
            },
            {
                path: "signin",
                element: (
                    <AuthRoute>
                        <Signin />
                    </AuthRoute>
                ),
            },
            {
                path: "signup",
                element: (
                    <AuthRoute>
                        <Signup />
                    </AuthRoute>
                ),
            },
            { path: "*", element: <NotFound /> },
        ],
    },
]);
export default router;
