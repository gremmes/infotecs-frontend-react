import React from "react";
import { List, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getUsers, userKeys, formatDate, UserAvatar, User } from "@/entities/user";

interface UserListProps {
  onUserClick: (id: string) => void;
}

export const UserList: React.FC<UserListProps> = ({ onUserClick }) => {
  const { data: users, isLoading } = useQuery({
    queryKey: userKeys.lists(),
    queryFn: getUsers,
  });

  if (isLoading) {
    return <div style={{ textAlign: "center", padding: 48 }}><Spin size="large" /></div>;
  }

  return (
    <List
      dataSource={users}
      renderItem={(user: User) => (
        <List.Item
          key={user.id}
          style={{ cursor: "pointer" }}
          onClick={() => onUserClick(user.id)}
        >
          <List.Item.Meta
            avatar={<UserAvatar src={user.avatar} />}
            title={user.name}
            description={`Зарегистрирован ${formatDate(user.createdAt)}`}
          />
        </List.Item>
      )}
    />
  );
};