import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "@/shared/config";
import { useAuth } from "@/features/auth";
import { LoginPage } from "@/pages/login";
import { NotFoundPage } from "@/pages/not-found";
import { UsersPage } from "@/pages/users";

export const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={
        isAuthenticated ? <Navigate to={ROUTES.USERS} replace /> : <LoginPage />
      } />
      <Route path={ROUTES.USERS} element={
        isAuthenticated ? <UsersPage /> : <Navigate to={ROUTES.LOGIN} replace />
      } />
      <Route path="/" element={<Navigate to={ROUTES.USERS} replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};