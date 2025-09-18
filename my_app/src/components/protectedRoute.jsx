import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
    const token = Cookies.get("access_token");
    return token ? children : <Navigate to="/" />;
}