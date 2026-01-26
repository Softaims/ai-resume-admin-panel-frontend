import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import api from "../utils/apiConfig";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, setUser, clearUser } = useUserStore();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        const response = await api.get("/admin/me");
        setUser(response.user || response.data);
        setIsChecking(false);
      } catch {
        clearUser();
        setIsChecking(false);
        navigate("/login");
      }
    };

    if (!user) {
      initialize();
    } else {
      setIsChecking(false);
    }
  }, [user, setUser, clearUser, navigate]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#2F279C] border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return children;
  } else {
    return null;
  }
};

export default ProtectedRoute;
