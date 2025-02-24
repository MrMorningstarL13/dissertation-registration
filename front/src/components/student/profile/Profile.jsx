import React from 'react'
import s from './Profile.module.css'
import { Form, Input, Button, Select } from "antd";
import useUserStore from "../../../stores/userStore"
import { use } from 'react';

export const Profile = () => {
    let user = {}
    user.email = useUserStore((state) => state.email)
    user.firstName = useUserStore((state) => state.firstName)
    user.lastName = useUserStore((state) => state.lastName)
    user.group = useUserStore((state) => state.group)
    user.phone = useUserStore((state) => state.phone)
    user.year = useUserStore((state) => state.year)
    user.edFormat = useUserStore((state) => state.edFormat)

    const setUser = useUserStore((state) => state.setStudent)

    const onFinish = (values) => {setUser(values) }

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
                        label="Group"
                        name="group"
                        initialValue={ user.group }
                        rules={[
                            {
                                required: true,
                                message: 'Please input your group!',
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


                    <Form.Item
                        label="Year"
                        name="year"
                        initialValue={ user.year}
                        rules={[
                            {
                                required: true,
                                message: "Please a select a year"
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
                        name="edFormat"
                        initialValue={ user.edFormat }
                        rules={[
                            {
                                required: true,
                                message: "Please a select your education format"
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
                        <Button type="primary" htmlType="submit" on>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>
    )
}
