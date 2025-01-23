import React, { useState } from 'react';
import useApplicationStore from '../../../stores/applicationStore';
import useUserStore from '../../../stores/userStore';

import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Button, Form, Input, Typography } from 'antd';
import axios from 'axios';
const { TextArea } = Input;

export default function UploadRequest() {
    const [isUpload, setIsUpload] = useState(false);
    const setStep = useApplicationStore((state) => state.setStep);
    const userId = useUserStore((state) => state.id);
    const sessionId = useApplicationStore((state) => state.sessionId);

    const { Dragger } = Upload;
    const props = {
        name: 'file',
        multiple: true,
        action: '',
        accept: '.pdf',
        beforeUpload: (file) => {
            const isPDF = file.type === 'application/pdf';
            console.log(isPDF);
            if (!isPDF) {
                message.error(`${file.name} is not a pdf file`);
            }
            return isPDF || Upload.LIST_IGNORE;
        },
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                setIsUpload(true);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <div>

            <Form
                onFinish={(values) => {
                    console.log('Form values:', values);
                    axios.post(`http://localhost:8080/api/request/create/${userId}/${sessionId}`, values)
                    message.success('Form submitted successfully!');
                    setStep(1)
                }}
            >
                <div>
                    <Typography.Title level={5}>Dissertation Title</Typography.Title>
                    <Form.Item
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter a dissertation title',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </div>

                <Typography.Title level={5}>Description</Typography.Title>
                <Form.Item
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter a description',
                        },
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item>
                    <Form.Item
                        name="dragger"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        </Dragger>
                    </Form.Item>
                </Form.Item>

               
                <Button  htmlType="submit" onClick={() => setStep(1)}>
                    Back
                </Button>
                <Button type="primary" htmlType="submit">
                    Send
                </Button>
            </Form>



        </div>
    )
}
