import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import { useCreateUser } from "../model/use-create-user";

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
}

interface CreateUserFormValues {
  name: string;
  avatar: string;
}

export const CreateUserModal: React.FC<CreateUserModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm<CreateUserFormValues>();
  const { mutate: create, isLoading } = useCreateUser(() => {
    form.resetFields();
    onClose();
  });

  useEffect(() => {
    if (open) form.resetFields();
  }, [open, form]);

  const handleOk = () => {
    form.validateFields().then((values) => create(values));
  };

  return (
    <Modal
      title="Создать пользователя"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText="Создать"
      cancelText="Отмена"
      confirmLoading={isLoading}
      okButtonProps={{ disabled: isLoading }}
      cancelButtonProps={{ disabled: isLoading }}
      closable={!isLoading}
      maskClosable={!isLoading}
      bodyStyle={{ padding: '24px' }}
    >
      <Form<CreateUserFormValues> form={form} layout="vertical" autoComplete="off">
        <Form.Item
          name="name"
          label="Имя"
          rules={[{ required: true, message: "Введите имя" }]}
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
    </Modal>
  );
};