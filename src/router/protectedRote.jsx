import { useAuth } from "../hooks/useAuth"
import {useLocation, Navigate, Outlet} from "react-router-dom"

export const ProtectedRoute=({allowedRoles})=>{
    const {auth}=useAuth()
    const location=useLocation()

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/auth" state={{ from: location }} replace />
    )
}