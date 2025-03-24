import { Navigate, Outlet } from "react-router";

function ProtectedRoute() {
    const token = localStorage.getItem("token");

    return !token ? <Outlet /> : <Navigate to="/dashboard" replace />;
}

export default ProtectedRoute;