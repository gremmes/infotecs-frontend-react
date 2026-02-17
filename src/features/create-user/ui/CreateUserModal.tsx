import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
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
      title="Создание пользователя"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      confirmLoading={isLoading}
      closable={!isLoading}
      maskClosable={!isLoading}
      bodyStyle={{ padding: '24px' }}
      footer={[
        <Button
          key="cancel"
          onClick={onClose}
          disabled={isLoading}
          style={{ backgroundColor: '#24618E', borderColor: '#24618E', color: '#fff' }}
        >
          Отмена
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleOk}
          loading={isLoading}
          style={{ backgroundColor: '#24618E', borderColor: '#24618E', color: '#fff' }}
        >
          Создать
        </Button>,
      ]}
    >
      <Form<CreateUserFormValues> form={form} layout="vertical" autoComplete="off">
        <Form.Item
          name="name"
          label="Имя"
          rules={[{ required: true, message: "Введите имя" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="avatar"
          label="Ссылка на аватарку"
          rules={[
            { required: true, message: "Введите ссылку на аватар" },
            { type: "url", message: "Введите корректную ссылку" },
          ]}
          style={{ marginBottom: 16 }}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};