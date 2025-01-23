import React, { useEffect, useState } from 'react';
import { Card, Modal, Button } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import useApplicationStore from '../../../stores/applicationStore';
import useUserStore from '../../../stores/userStore';
import s from '../../Professor/Applications/Applications.module.css';
import axios from 'axios';



export default function StudApplicationsManagement() {
    const inscreaseStep = useApplicationStore((state) => state.increaseStep);
    const step = useApplicationStore((state) => state.applicationStep);

    const [data, setData] = useState();
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const refreshToken = useApplicationStore((state) => state.refreshToken)
    const userId = useUserStore((state) => state.id);

    console.log(refreshToken)
    const fetchData = async () => {
        const res = await axios.get(`http://localhost:8080/api/request/get/${userId}`)
        console.log(res.data)
        setData(res.data)
    }
    useEffect(() => {
       console.log('fetching data')
        fetchData()
    }, [refreshToken]);

    const showModal = (item) => {
        setOpen(true);
        setSelectedItem(item)
    };

    const handleOk = () => { }
    const handleCancel = () => { setOpen(false) }
    const actions = [

    ]
    return (
        <div>

            <div className={s.cardsContainer}>
                {
                    data?.map((item, index) => {
                        return (
                            <Card
                                title={item.appTitle}
                                extra={<a onClick={() => showModal(item)}>More</a>}
                                className={s.card}
                            >
                                <p>{item.appDescription}</p>
                            </Card>
                        )
                    }
                    )
                }
            </div>
            <Button ey="request" type="primary" onClick={() => inscreaseStep()}>New Request</Button>

            <Modal
                open={open}
                title={`${selectedItem?.title}`}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[]}
            >
                <p>{`${selectedItem?.student}`}</p>
                <p>{`${selectedItem?.submissionDate}`}</p>
                <p>{`${selectedItem?.desription}`}</p>

            </Modal>
        </div>
    )
}
