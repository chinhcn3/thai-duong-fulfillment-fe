import { AuthService } from "@/swagger-api";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

export const SinInStyles = styled.div`
  margin: auto;
  margin-top: 200px;
  width: 400px;
  padding: 20px;
  border-radius: 4px;
  box-shadow:
    rgba(17, 17, 26, 0.05) 0px 4px 16px,
    rgba(17, 17, 26, 0.05) 0px 8px 32px;
`;
type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};
const SignIn = () => {
  const router = useRouter();
  const onFinish = async (values: any) => {
    const res = await AuthService.authControllerLogin(values);
    if (res.data.statusCode == 200) {
      router.push("/");
    }
  };
  const [disabledSave, setDisabledSave] = React.useState(true);

  const onFinishFailed = (errorInfo: any) => {};
  const [form] = Form.useForm();

  const handleFormChange = () => {
    const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
    setDisabledSave(hasErrors);
  };
  return (
    <SinInStyles>
      <Form
        onFieldsChange={handleFormChange}
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="email"
          name="email"
          rules={[
            {
              type: "email",
              message: "Không đúng định dạng",
            },
            {
              required: true,
              message: "Vui lòng nhập email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" disabled={disabledSave}>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </SinInStyles>
  );
};

export default SignIn;
