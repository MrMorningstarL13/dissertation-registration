import React from 'react'
import s from "./EmailSignIn.module.css"
import { Form, Input } from "antd";
import { Button } from "antd";
import useUserStore from "../../../stores/userStore"

export const EmailSignIn = ({ setFormStep, setIsProfessor }) => {
    const setEmail = useUserStore((state) => state.setEmail)
    const setProfessor = useUserStore((state) => state.setProfessor)

    const onFinish = (values) => {
        console.log(values)
        setEmail(values.email)
        if (values.email.includes("@stud")) {
            setIsProfessor(0)
            setFormStep(1)
        } else {
            setIsProfessor(1)
            setProfessor({
                email: "prof@ase.ro",
                firstName: "Prof",
                lastName: "Prof",
                phone: "123456789",
                specialization: "ASE",
            })
            setFormStep(2)
        }
        
    }

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
