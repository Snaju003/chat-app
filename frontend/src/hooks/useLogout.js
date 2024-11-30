import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
    
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success("Logout successful");
        } catch (error) {
            toast.error(error.message);
        } finally {
            localStorage.removeItem("auth-user");
            setAuthUser(null);
            setLoading(false);
        }
    };

    return { logout, loading };
};

export default useLogout;