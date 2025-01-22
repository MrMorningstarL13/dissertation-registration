import React from 'react'
import { Form, Input, Button, Select } from "antd";
import s from "./StudentSignIn.module.css"


export const StudentSignIn = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    return (
        <div className={s.formWrapper}>
            <div className={s.formContainer}>
                <h1>Complete your profile</h1>
                <Form
                    labelCol={{
                        span: 9,
                    }}

                    wrapperCol={{
                        span:18
                    }}
                    labelWrap={true}

                    style={{
                        maxWidth: 600,
                    }}
                    className={s.form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Group"
                        name="group"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your phone number!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Year"
                        name="year"
                        rules={[
                            {
                                required: true,
                                message: "Please a select an year"
                            }
                        ]}
                    >
                        <Select options={[{ value: '2019', label: <span>2019</span> },
                        { value: '2020', label: <span>2020</span> },
                        { value: '2021', label: <span>2021</span> },
                        { value: '2022', label: <span>2022</span> },
                        { value: '2023', label: <span>2023</span> }]}
                            placeholder={<span>2019</span>}
                            label={"Year"}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Education Format"
                        
                        name="educationFormat"
                        rules={[
                            {
                                required: true,
                                message: "Please a select an year"
                            }
                        ]}
                    >
                        <Select options={[{ value: 'ID', label: <span>ID</span> },
                        { value: 'IF', label: <span>IF</span> }]}
                            placeholder={<span>IF</span>}
                            label={"Year"}
                        />
                    </Form.Item>



                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Next
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
