import React from 'react'
import s from "./EmailSignIn.module.css"
import { Form, Input } from "antd";
import { Button } from "antd";

export const EmailSignIn = ({onSubmit}) => {

    const onFinish = onSubmit;

    return (
        <div>
            <div className={s.formWrapper}>
                <div className={s.formContainer}>
                    <h1>Enter Institutional Email Address</h1>
                    <Form
                        className={s.form}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            className='formItem'
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Next
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}
