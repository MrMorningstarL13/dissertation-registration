import React, { useState } from "react";
import {
    Card,
    Modal,
    Button,
    Typography,
    ConfigProvider,
    Upload,
    Collapse,
    Input
} from "antd";

const { TextArea } = Input;


import {
    CheckOutlined,
    CloseOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import s from "./Applications.module.css";

const dataFromApi = [
    {
        title: "Ai based project",
        student: "John Doe",
        submissionDate: "12/12/2021",
        accepted: true,
        desription:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!",
    },
    {
        title: "Ai based project2",
        student: "John Doe",
        submissionDate: "12/12/2021",
        accepted: true,

        desription:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!",
    },
    {
        title: "Ai based project3",
        student: "John Doe",
        submissionDate: "12/12/2021",
        accepted: false,
        desription:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!",
    },
    {
        title: "Ai based project4",
        student: "John Doe",
        submissionDate: "12/12/2021",
        accepted: false,
        desription:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!",
    },
    {
        title: "Ai based project5",
        accepted: "pending",
        desription:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!",
    },
    {
        title: "Ai based projec6t",
        accepted: "pending",
        desription:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!",
    },
    {
        title: "Ai based project7",
        accepted: "pending",
        desription:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!",
    },
];

export default function Applications() {

    const [open, setOpen] = useState(false);
    const [data, setData] = useState(dataFromApi);
    const [selectedItem, setSelectedItem] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const showModal = (item) => {
        setOpen(true);
        setSelectedItem(item);
    };

    const updateStatus = (title, status) => {
        // Create a new array and update the state immutably
        setData((prevData) =>
            prevData.map((item) =>
                item.title === title ? { ...item, accepted: status } : item
            )
        );
    };
    const handleAccept = (item) => {
        updateStatus(item.title, true)
        setOpen(false);

        //api
    };
    const handleRefuse = (item) => {
        updateStatus(item.title, false)
        setOpen(false);

        //api
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedItem(null);
        setFeedback(null);
    }

    const actions = (item) => {
        return [
            <CheckOutlined
                key="approve"
                onClick={() => handleAccept(item)}
            />,
            <CloseOutlined
                key="decline"
                onClick={() => handleRefuse(item)}

            />,
        ];
    };



    return (
        <div className={s.applicationsContainer}>
            <Collapse
                className={s.collapse}
                size="large"
                items={[
                    {
                        key: "1",
                        label: "Pending requests",
                        children: (
                            <>
                                {" "}
                                <Typography.Title level={2}>Pending requests</Typography.Title>
                                <div className={s.cardsContainer}>
                                    {data.map((item, index) => {
                                        return item.accepted == "pending" ? (
                                            <ConfigProvider
                                                theme={{
                                                    components: {
                                                        Card: {
                                                            headerBg: "#ffec3d", //yelloy5
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
                        key: "2",
                        label: "Accepted requests",
                        children: (
                            <>
                                <Typography.Title level={2}>Accepted requests</Typography.Title>
                                <div className={s.cardsContainer}>
                                    {data.map((item, index) => {
                                        return item.accepted === true ? (
                                            <ConfigProvider
                                                theme={{
                                                    components: {
                                                        Card: {
                                                            headerBg: "#73d13d", //green5
                                                        },
                                                    },
                                                }}
                                            >
                                                <Card
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
                        label: "Refused requests",
                        children: (
                            <>
                                <Typography.Title level={2}>Refused requests</Typography.Title>
                                <div className={s.cardsContainer}>
                                    {data.map((item, index) => {
                                        return !item.accepted ? (
                                            <ConfigProvider
                                                theme={{
                                                    components: {
                                                        Card: {
                                                            headerBg: "#ff4d4f", //red5
                                                        },
                                                    },
                                                }}
                                            >
                                                <Card
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
            />

            <Modal
                open={open}
                title={`${selectedItem?.title}`}
                onCancel={handleClose}
                footer={
                    selectedItem?.accepted === "pending"
                        ? [
                            <Button key="back" danger onClick={() => handleRefuse(selectedItem)}>
                                Refuse
                            </Button>,
                            <Button key="submit" type="primary" onClick={() => handleAccept(selectedItem)}>
                                Approve
                            </Button>,
                        ]
                        : null
                }
            >
                <p>{`${selectedItem?.student}`}</p>
                <p>{`${selectedItem?.submissionDate}`}</p>
                <p>{`${selectedItem?.desription}`}</p>
                {selectedItem?.accepted === 'pending' ? (
                    <TextArea onChange={(e) => setFeedback(e.target.innerText)} />
                ) : null}
            </Modal>
        </div>
    );
}
