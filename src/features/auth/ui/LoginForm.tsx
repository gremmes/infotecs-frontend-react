import React from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { useLogin } from "../model/use-login";

const { Title } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const { mutate: login, isLoading } = useLogin();

  const onFinish = (values: LoginFormValues) => {
    login(values);
  };

  return (
    <Card style={{ width: 400 }}>
      <Title level={3} style={{ textAlign: "left", marginBottom: 24 }}>
        Авторизация
      </Title>
      <Form<LoginFormValues>
        name="login"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Введите логин" }]}
        >
          <Input placeholder="Логин" size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password placeholder="Пароль" size="large" />
        </Form.Item>
        <Form.Item style={{ display: 'flex', justifyContent: "flex-end" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={isLoading}
            block
            size="large"
            style={{ backgroundColor: '#24618E', borderColor: '#24618E', color: '#fff' }}
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};