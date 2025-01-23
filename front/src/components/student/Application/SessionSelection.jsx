import React, { useEffect, useState } from 'react'
import { Table, Button } from "antd";
import useApplicationStore from '../../../stores/applicationStore';
import axios from 'axios';


const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
  {
    key: '3',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '4',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
  {
    key: '5',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '6',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Faculty',
    dataIndex: 'faculty',
    key: 'faculty',
  },
  {
    title: 'Slots',
    dataIndex: 'slots',
    key: 'slots',
  },
  {
    title: 'Period',
    dataIndex: 'startStop',
    key: 'startStop',
  },

];



export default function SessionSelection() {

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8080/api/session/`)
      let sessions = []
      console.log(res.data)
      res.data.map((ses) => {
        let session = {}
        session.key = ses.id
        session.faculty = ses.professor.faculty
        session.name = ses.professor.firstName + " " + ses.professor.lastName;
        session.slots = ses.availableSlots +"/"+ ses.maximumSlots;
        session.startStop = new Date(ses.startDate).toLocaleDateString('ro-RO')+" - "+ new Date(ses.endDate).toLocaleDateString('ro-RO');

        sessions.push(session)
      })
      setSessions(sessions)
    }
    fetchData()
  }, []);
  const inscreaseStep = useApplicationStore((state) => state.increaseStep);
  const decreaseStep = useApplicationStore((state) => state.decreaseStep);
  const setSession = useApplicationStore((state) => state.setSession);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSession(selectedRowKeys[0])
      setSelectedSession(selectedRowKeys[0])
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const onProfConfirmation = () => {
    inscreaseStep()
  }



  return (
    <div>
      <h1>Select Professor</h1>

      <Table
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={sessions}
      />
      <Button type="primary" onClick={() => decreaseStep()}>Back</Button>
      <Button disabled={selectedSession!=null ? false : true} type="primary" onClick={onProfConfirmation}>Next</Button>
    </div>
  )
}
