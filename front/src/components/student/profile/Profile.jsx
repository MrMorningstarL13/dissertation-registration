import React from 'react'
import './Profile.css'
import { Form, Input } from "antd";

export const Profile = () => {
    return (
        <div>
            <div className='formContainer'>
            <h1>Complete Profile</h1>
                <Form className='form'>
                    <Form.Item label="Input">
                        <Input />
                    </Form.Item>
                </Form>
            </div>

        </div>
    )
}
