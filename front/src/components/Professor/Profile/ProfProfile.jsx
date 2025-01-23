import React from 'react'
import s from './ProfProfile.module.css'
import { Form, Input, Button, Select, Progress } from "antd";
import useUserStore from "../../../stores/userStore"
import { use } from 'react';

export const ProfProfile = () => {
    let user = {}
    user.email = useUserStore((state) => state.email)
    user.firstName = useUserStore((state) => state.firstName)
    user.lastName = useUserStore((state) => state.lastName)
    user.phone = useUserStore((state) => state.phone)
    user.specialization = useUserStore((state) => state.specialization)
    const setProfessor = useUserStore((state) => state.setProfessor)

    const onFinish = (values) => {setProfessor(values) }

    return (
        <div>
            <div className={s.formContainer}>
                <h1>Edit Profile</h1>
                <Form
                    labelCol={{
                        span: 9,
                    }}

                    wrapperCol={{
                        span: 18
                    }}
                    labelWrap={true}

                    style={{
                        maxWidth: 600,
                    }}
                    className={s.form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        initialValue={user.email }
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
                        label="First Name"
                        name="firstName"
                        initialValue={ user.firstName }

                        rules={[
                            {
                                required: true,
                                message: 'Please input your first name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        initialValue={ user.lastName}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your last name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                        initialValue={ user.phone }
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
                        label="Specialization"
                        name="specialization"
                        initialValue={ user.specialization }
                        rules={[
                            {
                                required: true,
                                message: "Please a select a specialization"
                            }
                        ]}
                    >
                        <Select options={[
                            { value: 'ei', label: <span>Economic Informatics</span> },
                            { value: 'cyb', label: <span>Cybernetics</span> },
                            { value: 'stat', label: <span>Statistics</span> }]}
                            placeholder={<span>Economic Informatics</span>}
                        />
                    </Form.Item>
                    <Progress percent={1.5}/>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" on>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>
    )
}
