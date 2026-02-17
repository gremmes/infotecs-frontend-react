import React from "react";
import styled from "styled-components";
import { LoginForm } from "@/features/auth";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

export const LoginPage: React.FC = () => (
  <PageWrapper>
    <LoginForm />
  </PageWrapper>
);