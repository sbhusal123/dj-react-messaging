
import { Navigate } from "react-router";
import useTokenCheck from "../hooks/useTokenCheck";


export default function PrivateRoutes({ Component }) {
    
    const {isAuthenticated, isLoading} = useTokenCheck()

    
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
            </div>
        )
    }

    return isAuthenticated ? <Component /> : <Navigate to="/" />;
}
