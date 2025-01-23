import React, { useState, useEffect } from 'react'
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import SessionSelection from './SessionSelection';
import useApplicationStore from '../../../stores/applicationStore';
import StudApplicationsManagement from './StudApplicationsManagement';
import UploadRequest from './UploadRequest';
import UploadRequestFinal from './UploadRequestFinal'
import useUserStore from "../../../stores/userStore";
import axios from 'axios';
import Finished from './Finished';

export function StudApplication() {
    const applicationStep = useApplicationStore((state) => state.applicationStep);
    const setStep = useApplicationStore((state) => state.setStep);
    const userId = useUserStore((state) => state.id);

    const onChange = (value) => {
    };
    const [approvedRequest, setApprovedRequest] = useState([]);
    const [finishedRequest, setFinishedRequest] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:8080/api/request/get/${userId}`)
            res.data.map((item) => {
                if (item.wasApproved == true) {
                    console.log(item)
                    setApprovedRequest(item)
                    if(item.isApprovedUpload == true)
                    {
                        setFinishedRequest(item)
                        setStep(5)
                    }else{

                        setStep(4)
                    }
                }
            })
        }
        fetchData()
    }, []);

    let ApplicationForm = <SessionSelection></SessionSelection>

    switch (applicationStep) {
        case 1:
            ApplicationForm = <StudApplicationsManagement ></StudApplicationsManagement >
            break;

        case 2:
            ApplicationForm = <SessionSelection></SessionSelection>
            break;
        case 3:
            ApplicationForm = <UploadRequest></UploadRequest>
            break;
        case 4:
            ApplicationForm = <UploadRequestFinal approvedRequest={approvedRequest}></UploadRequestFinal>
            break;
        case 5:
            ApplicationForm = <Finished approvedRequest={finishedRequest}></Finished>
            break;
    }


    return (
        <div>
            <Steps
                current={applicationStep}
                onChange={onChange}
                items={[
                    {
                        title: 'Login',
                        icon: <UserOutlined />,
                        status: "finish",
                        disabled: true
                    },
                    {
                        title: 'Solicit collaboration',
                        icon: <SolutionOutlined />,
                    },
                    {
                        title: 'Awaiting confirmation',
                        icon: <LoadingOutlined />,
                    },
                    {
                        title: 'Download request',
                        icon: <SmileOutlined />,
                    },
                ]}
            />
            {ApplicationForm}
        </div>
    )
}
