import React from "react";
import s from "./EmailSignIn.module.css";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import useUserStore from "../../../stores/userStore";
import axios from "axios";

export const EmailSignIn = ({ setFormStep, setIsProfessor }) => {
  const setEmail = useUserStore((state) => state.setEmail);
  const setProfessor = useUserStore((state) => state.setProfessor);
  const setUser = useUserStore((state) => state.setStudent)

  const handleRegister = () => {
    setProfessor(false)
    setFormStep(1)
  }

  const onFinish = async (values) => {
    console.log(values);
    setEmail(values.email);
    if (values.email.includes("@stud")) {
      setIsProfessor(0);
      const res = await axios.post("http://localhost:8080/api/student/logIn", values)
      let user = res.data;
      user.isProfessor = 0;
      user.year = res.data.yearOfEnrollment
      user.phone = res.data.phoneNumber;

      setUser(user)
      
      console.log(res)
      setFormStep(2);
    } else {
      setIsProfessor(1);
      setProfessor({
        email: "prof@ase.ro",
        firstName: "Prof",
        lastName: "Prof",
        phone: "123456789",
        specialization: "ASE",
      });
      setFormStep(2);
    }
  };

  return (
    <div>
      <div className={s.formWrapper}>
        <div className={s.formContainer}>
          <h1>Enter Institutional Email Address</h1>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="">Forgot password</a>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
              or <a onClick={handleRegister}>Register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
