import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { ROUTES } from "@/shared/config";
import { simulateLogin } from "../api/login";
import { useAuth } from "./use-auth";

export const useLogin = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: simulateLogin,
    onSuccess: (token) => {
      setToken(token);
      navigate(ROUTES.USERS);
    },
    onError: (error: Error) => {
      notification.error({
        message: "Ошибка авторизации",
        description: error.message,
      });
    },
  });
};