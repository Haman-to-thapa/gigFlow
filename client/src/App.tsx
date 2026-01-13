import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "./api/axios";
import { setUser, logout } from "./redux/authSlice";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await api.get("/auth/me");

        dispatch(
          setUser({
            id: res.data.user.id,
            name: "",
            email: "",
          })
        );
      } catch {
        dispatch(logout());
        navigate("/login");
      }
    };

    checkSession();
  }, []);

  return <AppRoutes />;
}
