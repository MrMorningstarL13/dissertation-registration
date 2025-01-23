import React, { useState } from "react";
import useApplicationStore from "../../../stores/applicationStore";
import useUserStore from "../../../stores/userStore";

import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Button, Input, Typography } from "antd";
const { Dragger } = Upload;

import axios from "axios";

export default function UploadRequestFinal({ approvedRequest }) {
    const [fileList, setFileList] = useState([]);
    const setStep = useApplicationStore((state) => state.setStep);
    const userId = useUserStore((state) => state.id);
    const sessionId = useApplicationStore((state) => state.sessionId);

    const handleSubmit = () => {
        if (fileList.length === 0) {
            message.error('Please upload a file first');
            return;
        }

        const formData = new FormData();
        formData.append('',fileList[0]);
        formData.append('studentId', userId);

        axios.post(`http://localhost:8080/api/student/uploadRequest/${userId}/${sessionId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(() => {
                message.success('File uploaded successfully');
                setStep(1);
            })
            .catch((error) => {
                message.error('File upload failed');
                console.error(error);
            });
    };

    const props = {
        name: "file",
        multiple: false,
        accept: ".pdf",
        beforeUpload: (file) => {
            const isPDF = file.type === "application/pdf";
            if (!isPDF) {
                message.error(`${file.name} is not a pdf file`);
                return Upload.LIST_IGNORE;
            }
            setFileList([file]);
            return false;
        },
    };

    return (
        <div>
            <div>
                <Typography.Title level={2}>Dissertation Title</Typography.Title>
                <Typography.Title level={5}>{approvedRequest.appTitle}</Typography.Title>
            </div>

            <Typography.Title level={2}>Description</Typography.Title>
            <Typography.Title level={5}>{approvedRequest.appDescription}</Typography.Title>

            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                    Click or drag file to this area to upload
                </p>
            </Dragger>

            <Button htmlType="submit" onClick={() => setStep(1)}>
                Back
            </Button>
            <Button type="primary" onClick={handleSubmit}>
                Send
            </Button>
        </div>
    );
}
