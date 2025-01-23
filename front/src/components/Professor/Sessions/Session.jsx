import React, { useState } from "react";
import {
    Card, Typography, ConfigProvider, Collapse, Modal,
    Button, Upload
} from "antd";
import s from "./Session.module.css";

import {
    CheckOutlined,
    CloseOutlined,
    UploadOutlined,
    DownloadOutlined
} from "@ant-design/icons";



export default function Session() {
    const dataFromApi = [
        {
            title: "Ai based project",
            student: "John Doe",
            submissionDate: "12/12/2021",
            accepted: true,
            fileUploaded: true,
            isApprovedUpload: true,
            desription:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!",
        },
        {
            title: "Ai based project2",
            student: "John Doe",
            submissionDate: "12/12/2021",
            accepted: true,
            fileUploaded: true,
            isApprovedUpload: "pending",
            desription:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!",
        },
        {
            title: "Ai based project3",
            student: "John Doe",
            submissionDate: "12/12/2021",
            accepted: true,
            fileUploaded: true,
            desription:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!",
        },
        {
            title: "Ai based project4",
            student: "John Doe",
            submissionDate: "12/12/2021",
            accepted: true,
            fileUploaded: false,
            isApprovedUpload: "pending",
            desription:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!",
        },
        {
            title: "Ai based project5",
            accepted: true,
            fileUploaded: false,
            desription:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!",
        },
        {
            title: "Ai based projec6t",
            accepted: true,
            fileUploaded: false,
            desription:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!",
        },
        {
            title: "Ai based project7",
            accepted: true,
            fileUploaded: false,
            desription:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!",
        },
    ];
    const [data, setData] = useState(dataFromApi);


    const [selectedItem, setSelectedItem] = useState(null);
    const [open, setOpen] = useState(false);
    const showModal = (item) => {
        setOpen(true);
        setSelectedItem(item);
    };


    const updateStatus = (title, status) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.title === title ? { ...item, isApprovedUpload: status } : item
            )
        );
    };

    const uploadProps = {
        name: "file",
        action: "",
        headers: {
            authorization: "authorization-text",
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };


    const handleApprove = (item) => { 
        updateStatus(item.title, true);
        setOpen(false);

    };

    const handleRefuse = (item) => {
        updateStatus(item.title, false);
        console.log(item)
        setOpen(false);

    };
    const handleCancel = () => {
        setOpen(false);
    };
    const actions = (item) => {
        return [
            <CheckOutlined
                key="approve"
                onClick={() => updateStatus(item.title, true)}
            />,
            <CloseOutlined
                key="decline"
                onClick={() => updateStatus(item.title, false)}
            />,
        ];
    };

    return (
        <div>
            <Collapse
                className={s.collapse}
                size="large"
                items={[
                    {
                        key: "1",
                        label: "Awaiting file upload",
                        children: (
                            <>
                                <Typography.Title level={2}>Awaiting file upload</Typography.Title>
                                <div className={s.cardsContainer}>
                                    {data.map((item, index) => {
                                        return (item.fileUploaded == false || item?.isApprovedUpload === false) ? (
                                            <ConfigProvider
                                                theme={{
                                                    components: {
                                                        Card: {
                                                            headerBg: "#f4ffb8", //lime3
                                                        },
                                                    },
                                                }}
                                            >
                                                <Card
                                                    //   actions={actions(item)}
                                                    title={item.title}
                                                    extra={<a onClick={() => showModal(item)}>More</a>}
                                                    className={s.card}
                                                >
                                                    <p>{item?.student}</p>
                                                    <p>{item.desription}</p>
                                                </Card>
                                            </ConfigProvider>
                                        ) : null;
                                    })}
                                </div>
                            </>
                        ),
                    },
                    {
                        key: "2",
                        label: "Awaiting uploaded file approval",
                        children: (
                            <>
                                <Typography.Title level={2}>Awaiting uploaded file approval</Typography.Title>
                                <div className={s.cardsContainer}>
                                    {data.map((item, index) => {
                                        return item.fileUploaded == true && item?.isApprovedUpload == 'pending' ? (
                                            <ConfigProvider
                                                theme={{
                                                    components: {
                                                        Card: {
                                                            headerBg: "#d3f261", //lime4
                                                        },
                                                    },
                                                }}
                                            >
                                                <Card
                                                    actions={actions(item)}
                                                    title={item.title}
                                                    extra={<a onClick={() => showModal(item)}>More</a>}
                                                    className={s.card}
                                                >
                                                    <p>{item?.student}</p>
                                                    <p>{item.desription}</p>
                                                </Card>
                                            </ConfigProvider>
                                        ) : null;
                                    })}
                                </div>
                            </>
                        ),
                    },
                    {
                        key: "3",
                        label: "Finished",
                        children: (
                            <>
                                <Typography.Title level={2}>Finished</Typography.Title>
                                <div className={s.cardsContainer}>
                                    {data.map((item, index) => {
                                        return (item.fileUploaded == true && item?.isApprovedUpload == true) ? (
                                            <ConfigProvider
                                                theme={{
                                                    components: {
                                                        Card: {
                                                            headerBg: "#bae637", //lime5
                                                        },
                                                    },
                                                }}
                                            >
                                                <Card
                                                    // actions={actions(item)}
                                                    title={item.title}
                                                    extra={<a onClick={() => showModal(item)}>More</a>}
                                                    className={s.card}
                                                >
                                                    <p>{item?.student}</p>
                                                    <p>{item.desription}</p>
                                                </Card>
                                            </ConfigProvider>
                                        ) : null;
                                    })}
                                </div>
                            </>
                        ),
                    },
                ]}
            ></Collapse>

            <Modal
                open={open}
                title={`${selectedItem?.title}`}
                onCancel={handleCancel}
                footer={
                    selectedItem?.fileUploaded == true && selectedItem?.isApprovedUpload != true
                        ? [
                            <Button key="back" danger onClick={()=>handleRefuse(selectedItem)}>
                                Refuse
                            </Button>,
                            <Button key="submit" type="primary" onClick={()=>handleApprove(selectedItem)}>
                                Approve
                            </Button>,
                            (
                                <Upload {...uploadProps}>
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>)]
                        : null
                }
            >
                <p>{`${selectedItem?.student}`}</p>
                <p>{`${selectedItem?.submissionDate}`}</p>
                <p>{`${selectedItem?.desription}`}</p>
                {(selectedItem?.fileUploaded == true && selectedItem?.isApprovedUpload != true) ? (
                    <a href={"API"} download>
                        <DownloadOutlined />
                    </a>
                ) : null}
            </Modal>
        </div>
    );
}
