import React from 'react'
import { message, Button, Typography } from 'antd';
import axios from 'axios';

export default function Finished({ approvedRequest }) {
    const handleDownload = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/request/download/${approvedRequest.id}`, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${approvedRequest.appTitle}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            message.success('Downloaded successfully');
        } catch (error) {
            message.error('Download failed');
            console.error(error);
        }
    };

    return (
        <div>
            <Typography.Title level={2}>Download approved request</Typography.Title>
            <div>
                <Typography.Title level={2}>Dissertation Title</Typography.Title>
                <Typography.Title level={5}>{approvedRequest.appTitle}</Typography.Title>
            </div>

            <Typography.Title level={2}>Description</Typography.Title>
            <Typography.Title level={5}>{approvedRequest.appDescription}</Typography.Title>
            <Button type="primary" onClick={handleDownload}>Download</Button>
        </div>
    )
}