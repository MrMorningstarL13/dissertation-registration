import React, { useEffect, useState } from "react";
import useUserStore from "../../../stores/userStore"
import axios from "axios";
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
    ProductFilled,
    UploadOutlined,
} from "@ant-design/icons";
import s from "./Applications.module.css";

export default function Applications() {

    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const profId = useUserStore((state) => state.id);
    console.log(profId)
    useEffect(() => {
        const fetchData = async () => {
            console.log(profId)
            const res = await axios.get(`http://localhost:8080/api/session/${profId}`)
            let requests = []
            console.log(res.data)
            res.data[0].requests.map((item) => {
                let request = {}
                request.title = item.appTitle
                request.desription = item.appDescription
                request.submissionDate = new Date(item.requestDate).toLocaleDateString('ro-RO')
                request.accepted = item.wasApproved
                request.student = item.student.firstName + " " + item.student.lastName
                request.id = item.id
                request.denialJustification = item.denialJustification
                requests.push(request)  
            })
            console.log(requests)
            setData(requests)
        };
        fetchData();
    }, []);

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
        axios.patch(`http://localhost:8080/api/request/upload/${item.id}`,{wasApproved:true})
        setOpen(false);

        //api
    };
    const handleRefuse = (item) => {
        item.denialJustification = feedback
        updateStatus(item.title, false)
        axios.patch(`http://localhost:8080/api/request/upload/${item.id}`,{
        wasApproved:false,
        denialJustification: feedback
    })
        setFeedback("")
        setOpen(false);

        //api
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedItem(null);
        setFeedback("");
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
                                    {data?.map((item, index) => {
                                        return item.accepted == null ? (
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
                                        return item.accepted == true ? (
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
                                        return item.accepted ===false ? (
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
                    selectedItem?.accepted == null
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
                {selectedItem?.accepted == null ? (
                    <TextArea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                ) : null}
                {selectedItem?.accepted === false ? (
                    <>
                    <b>Denial justification:</b>
                     <p>{selectedItem?.denialJustification}</p>
                    </>
                ):null}
            </Modal>
        </div>
    );
}
