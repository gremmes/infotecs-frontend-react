import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface UserAvatarProps {
  src?: string;
  size?: number;
  onClick?: () => void;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ src, size = 40, onClick }) => {
  return (
    <Avatar
      src={src}
      size={size}
      icon={<UserOutlined />}
      onClick={onClick}
      style={onClick ? { cursor: "pointer" } : undefined}
    />
  );
};
