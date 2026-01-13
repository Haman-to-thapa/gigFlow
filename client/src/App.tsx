import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "./api/axios";
import { setUser, logout } from "./redux/authSlice";
import AppRoutes from "./routes/AppRoutes";
import type { RootState } from "./redux/store";
import socket from "./socket";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);


  //socket

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => {
        dispatch(setUser(res.data.user));
      })
      .catch(() => {
        dispatch(logout());
        navigate("/login");
      });
  }, []);

  useEffect(() => {
    if (user) {
      socket.connect();
      socket.emit("join", user.id);

      socket.on("hired", (data) => {
        alert(`🎉 You have been hired for "${data.gigTitle}"`);
      });
    }

    return () => {
      socket.off("hired");
      socket.disconnect();
    };
  }, [user]);

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
