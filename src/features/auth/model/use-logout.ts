import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/config";
import { useAuth } from "./use-auth";

export const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return useCallback(() => {
    logout();
    navigate(ROUTES.LOGIN);
  }, [logout, navigate]);
};