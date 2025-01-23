import React, { useState } from 'react'
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
import SessionSelection from './SessionSelection';
import useApplicationStore from '../../../stores/applicationStore';
import StudApplicationsManagement from './StudApplicationsManagement';
import UploadRequest from './UploadRequest';

export function StudApplication() {
    const applicationStep = useApplicationStore((state) => state.applicationStep);
    const inscreaseStep = useApplicationStore((state) => state.increaseStep);
    const onChange = (value) => {

    };
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
            //   return <div>Application finished</div>
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
