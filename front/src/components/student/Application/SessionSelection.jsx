import React, { useState } from 'react'
import { Table, Button } from "antd";
import useApplicationStore from '../../../stores/applicationStore';


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
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },

];



export default function SessionSelection() {
  const inscreaseStep = useApplicationStore((state) => state.increaseStep);
  const decreaseStep = useApplicationStore((state) => state.decreaseStep);

  const [profs, setProfs] = useState([]);


  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setProfs(selectedRowKeys)
      console.log(profs)
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const onProfConfirmation = () => {
    inscreaseStep()
  }

  console.log(profs.length)


  return (
    <div>
      <h1>Select Professor</h1>

      <Table
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
      />
      <Button type="primary" onClick={() => decreaseStep()}>Back</Button>
      <Button disabled={profs.length !== 0 ? false : true} type="primary" onClick={onProfConfirmation}>Next</Button>
    </div>
  )
}
