import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { AuthProvider } from "@/features/auth";
import { WithQueryClient } from "./providers/with-query-client";
import { AppRoutes } from "./routes";
import { GlobalStyle } from "./styles/global";

export const App: React.FC = () => (
  <BrowserRouter>
    <WithQueryClient>
      <ConfigProvider>
        <AuthProvider>
          <GlobalStyle />
          <AppRoutes />
        </AuthProvider>
      </ConfigProvider>
    </WithQueryClient>
  </BrowserRouter>
);