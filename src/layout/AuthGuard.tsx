import { Navigate } from "react-router-dom";
import { getAccessToken } from "@/server/utils/jwt.ts";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = getAccessToken();

    if (!token) {
        return <Navigate to="/auth/login" />;
    }

    return <>{children}</>;
};

export default AuthGuard;