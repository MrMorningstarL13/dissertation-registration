import React, { useState } from 'react'
import { message, Button, Typography } from 'antd';
import useApplicationStore from '../../../stores/applicationStore';

import axios from 'axios';

export default function Finished({ approvedRequest }) {
    // const [profId, setProfId] = useState();
    // const [sessionID, setSessionId] = useState();
    
    console.log(approvedRequest.session.professorId)
    //const profId = approvedRequest.session.professorId;
    //const sessionID = approvedRequest.sessionId
    

    return (
        <div>
            <Typography.Title level={2}>Download approved request</Typography.Title>
            <div>
                <Typography.Title level={2}>Dissertation Title</Typography.Title>
                <Typography.Title level={5}>{approvedRequest.appTitle}</Typography.Title>
            </div>

            <Typography.Title level={2}>Description</Typography.Title>
            <Typography.Title level={5}>{approvedRequest.appDescription}</Typography.Title>
            <a
                href={`http://localhost:8080/api/student/getApprovedRequest/${approvedRequest.session.professorId}/${approvedRequest.sessionId}`}
                download
            >
                <Button type="primary">Download</Button>
            </a>
        </div>
    )
}