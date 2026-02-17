import React, { useEffect } from "react";
import { Modal, Form, Input, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getUserById, userKeys } from "@/entities/user";
import { useEditUser } from "../model/use-edit-user";

interface EditUserModalProps {
  userId: string | null;
  open: boolean;
  onClose: () => void;
}

interface EditUserFormValues {
  id: string;
  name: string;
  avatar: string;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({ userId, open, onClose }) => {
  const [form] = Form.useForm<EditUserFormValues>();

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: userKeys.detail(userId!),
    queryFn: () => getUserById(userId!),
    enabled: !!userId && open,
  });

  const { mutate: edit, isLoading: isSaving } = useEditUser(() => onClose());

  useEffect(() => {
    if (user) form.setFieldsValue({ id: user.id, name: user.name, avatar: user.avatar });
  }, [user, form]);

  useEffect(() => {
    if (!open) form.resetFields();
  }, [open, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (userId) edit({ id: userId, data: { name: values.name, avatar: values.avatar } });
    });
  };

  return (
    <Modal
      title="Редактировать пользователя"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText="Сохранить"
      cancelText="Отмена"
      confirmLoading={isSaving}
      okButtonProps={{ disabled: isSaving || isLoadingUser }}
      cancelButtonProps={{ disabled: isSaving }}
      closable={!isSaving}
      maskClosable={!isSaving}
      bodyStyle={{ padding: 24 }}
    >
      {isLoadingUser ? (
        <div style={{ textAlign: "center", padding: 24 }}><Spin /></div>
      ) : (
        <Form<EditUserFormValues> form={form} layout="vertical" autoComplete="off" style={{ maxWidth: 400, margin: '0 auto' }}>
          <Form.Item 
            name="id"
            label="ID"
            style={{ marginBottom: 16 }}
          >
            <Input disabled /></Form.Item>
          <Form.Item
            name="name"
            label="Имя"
            rules={[{ required: true, message: "Введите имя" }]}
            style={{ marginBottom: 16 }}
          >
            <Input placeholder="Введите имя" />
          </Form.Item>
          <Form.Item
            name="avatar"
            label="Аватар (URL)"
            rules={[
              { required: true, message: "Введите ссылку на аватар" },
              { type: "url", message: "Введите корректную ссылку" },
            ]}
            style={{ marginBottom: 16 }}
          >
            <Input placeholder="https://example.com/avatar.png" />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};