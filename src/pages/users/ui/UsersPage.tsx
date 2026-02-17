import React, { useState } from "react";
import { Button } from "antd";
import styled from "styled-components";
import { useLogout } from "@/features/auth";
import { UserList } from "@/widgets/user-list";
import { CreateUserModal } from "@/features/create-user";
import { EditUserModal } from "@/features/edit-user";

const PageWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

const StyledButton = styled(Button)`
  background-color: #24618E;
  border-color: #24618E;
  color: #fff;
`;

export const UsersPage: React.FC = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const handleLogout = useLogout();

  return (
    <PageWrapper>
      <TopBar>
        <StyledButton onClick={handleLogout}>Выход</StyledButton>
      </TopBar>
      <UserList onUserClick={(id) => setEditingUserId(id)} />
      <StyledButton
        type="primary"
        onClick={() => setCreateModalOpen(true)}
        style={{ marginTop: 16 }}
      >
        Создать пользователя
      </StyledButton>
      <CreateUserModal open={isCreateModalOpen} onClose={() => setCreateModalOpen(false)} />
      <EditUserModal userId={editingUserId} open={!!editingUserId} onClose={() => setEditingUserId(null)} />
    </PageWrapper>
  );
};