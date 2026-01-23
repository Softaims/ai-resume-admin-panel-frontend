import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import api from "../utils/apiConfig";
import { useNavigate } from "react-router-dom";
import { PageSkeleton } from "../components/global/Skeleton";

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
    return <PageSkeleton />;
  }

  if (user) {
    return children;
  } else {
    return null;
  }
};

export default ProtectedRoute;
