import { Form, Input, Button, Select } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import s from "./StudentSignIn.module.css"
import useUserStore from "../../../stores/userStore"
import axios from 'axios'

export const StudentSignIn = ({ onSubmit }) => {
    const setUser = useUserStore((state) => state.setStudent)
    const onFinish = async (values) => {
        console.log('Success:', values);
        setUser(values)
        const user = await axios.post('http://localhost:8080/api/student/signUp', values)
        onSubmit()
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
                        label="First Name"
                        name="firstName"
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
                        label="Faculty"
                        name="faculty"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your Faculty!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Specialization"
                        name="specialization"
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
                        label="Series"
                        name="series"
                        rules={[
                            {
                                required: true,
                                message: "Please a select a Series"
                            }
                        ]}
                    >
                        <Select options={[
                        { value: 'A', label: <span>A</span> },
                        { value: 'B', label: <span>B</span> },
                        { value: 'C', label: <span>C</span> },
                        { value: 'D', label: <span>D</span> },
                        { value: 'E', label: <span>E</span> },
                        { value: 'F', label: <span>F</span> },
                        { value: 'G', label: <span>G</span> },
                        { value: 'H', label: <span>H</span> }]}
                            placeholder={<span>A</span>}
                            label={"Series"}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Education Format"

                        name="edFormat"
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

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: "Please input your Email!" },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="password"
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
                        <Button type="primary" htmlType="submit" on>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
