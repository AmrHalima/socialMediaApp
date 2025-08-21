import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Navigate } from "react-router-dom";

export default function AuthRoute({ children }) {
    const { user } = useContext(UserContext);
    const isLoggedIn = user && Object.keys(user).length > 0;

    return !isLoggedIn ? <>{children}</> : <Navigate to="/" />;
}