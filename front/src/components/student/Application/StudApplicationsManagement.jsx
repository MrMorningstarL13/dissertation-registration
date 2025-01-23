import React, { useState } from 'react';
import { Card, Modal, Button } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import useApplicationStore from '../../../stores/applicationStore';
import s from '../../Professor/Applications/Applications.module.css'; 

const data = [
    {
        title: "Ai based project",
        student: "John Doe",
        submissionDate: "12/12/2021",
        desription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!"
    },
    {
        title: "Ai based project2",
        student: "John Doe",
        submissionDate: "12/12/2021",
        desription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!"
    },
    {
        title: "Ai based project3",
        student: "John Doe",
        submissionDate: "12/12/2021",
        desription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!"
    },
    {
        title: "Ai based project4",
        student: "John Doe",
        submissionDate: "12/12/2021",
        desription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!"
    },
    {
        title: "Ai based project5",
        desription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!"
    },
    {
        title: "Ai based projec6t",
        desription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!"
    },
    {
        title: "Ai based project7",
        desription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab deleniti assumenda praesentium natus cum reiciendis eligendi aspernatur, est quod dolorem quam iusto aut omnis animi temporibus! Dolore asperiores debitis optio!"
    },
]
export default function StudApplicationsManagement() {
    const inscreaseStep = useApplicationStore((state) => state.increaseStep);

    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const showModal = (item) => {
        setOpen(true);
        setSelectedItem(item)
    };

    const handleOk = () => { }
    const handleCancel = () => { setOpen(false) }
    const actions = [
        <CheckOutlined key="approve" onClick={() => console.log("ceva")} />,
        <CloseOutlined key="decline" onClick={() => console.log("altcv")} />
    ]
    return (
        <div>

            <div className={s.cardsContainer}>
                {
                    data.map((item, index) => {
                        return (
                            <Card
                                actions={actions}
                                title={item.title}
                                extra={<a onClick={() => showModal(item)}>More</a>}
                                className={s.card}
                            >
                                <p>{item.desription}</p>
                            </Card>
                        )
                    }
                    )
                }
            </div>
                <Button ey="request" type="primary" onClick={()=>inscreaseStep()}>New Request</Button>

            <Modal
                open={open}
                title={`${selectedItem?.title}`}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Submit
                    </Button>,

                ]}
            >
                <p>{`${selectedItem?.student}`}</p>
                <p>{`${selectedItem?.submissionDate}`}</p>
                <p>{`${selectedItem?.desription}`}</p>

            </Modal>
        </div>
    )
}
