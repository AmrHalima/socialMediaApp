import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Navigate } from "react-router-dom";

export default function ProtectRoute({ children }) {
    const { user } = useContext(UserContext);
    return !user ? <>{children}</> : <Navigate to="/" />;
}
