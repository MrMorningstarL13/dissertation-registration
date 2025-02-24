import React, { useEffect, useState } from "react";
import useUserStore from "../../../stores/userStore";
import axios from "axios";

import {
  Card,
  Typography,
  ConfigProvider,
  Collapse,
  Modal,
  Button,
  Upload,
  message,
} from "antd";
import s from "./Session.module.css";

import {
  CheckOutlined,
  CloseOutlined,
  UploadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import useApplicationStore from "../../../stores/applicationStore";

export default function Session() {
  const [data, setData] = useState();
  const [fileToUpload, setFileToUpload] = useState(null);
  const [sessionID, setSessionID] = useState(null);
  const profId = useUserStore((state) => state.id);
  const sessionId = useApplicationStore((state) => state.sessionId);

  useEffect(() => {
    const fetchData = async () => {
      console.log(profId);
      const res = await axios.get(
        `http://localhost:8080/api/session/accepted/${profId}`
      );
      let requests = [];
      console.log(res.data);
      setSessionID(res.data[0].id);
      res.data[0].requests.map((item) => {
        let request = {};
        request.title = item.appTitle;
        request.userId = item.student.id;
        request.desription = item.appDescription;
        request.submissionDate = new Date(item.requestDate).toLocaleDateString(
          "ro-RO"
        );
        request.accepted = item.wasApproved;
        request.student = item.student.firstName + " " + item.student.lastName;
        request.id = item.id;
        request.fileUploaded = item.hasUploaded;
        request.isApprovedUpload = item.isApprovedUpload;
        request.denialJustification = item.denialJustification;
        requests.push(request);
      });
      console.log(requests);
      setData(requests);
    };
    fetchData();
  }, []);

  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [success, setSuccess] = useState(false);

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
    beforeUpload: (file) => {
      const isPDF = file.type === "application/pdf";
      if (!isPDF) {
        message.error(`${file.name} is not a pdf file`);
        return Upload.LIST_IGNORE;
      }
      setFileList([file]);
      return false;
    },
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
    axios.patch(`http://localhost:8080/api/request/upload/${item.id}`, {
      isApprovedUpload: true,
    });
    setOpen(false)
}
  const handleUpload = (item) => {
    if (fileList.length === 0) {
      message.error("Please upload a file first");
      return;
    }
   
    const formData = new FormData();
    formData.append("", fileList[0]);

    axios
      .post(
        `http://localhost:8080/api/professor/uploadRequest/${profId}/${sessionID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        message.success("File uploaded successfully");
        setSuccess(true);
      })
      .catch((error) => {
        message.error("File upload failed");
        console.error(error);
      });
  };

  const handleRefuse = (item) => {
    updateStatus(item.title, false);
    axios.patch(`http://localhost:8080/api/request/upload/${item.id}`, {
      isApprovedUpload: false,
    });
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const actions = (item) => {
    return [
      <CheckOutlined key="approve" onClick={() => handleApprove(item)} />,
      <CloseOutlined key="decline" onClick={() => handleRefuse(item)} />,
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
                <Typography.Title level={2}>
                  Awaiting file upload
                </Typography.Title>
                <div className={s.cardsContainer}>
                  {data?.map((item, index) => {
                    return item.fileUploaded == false ||
                      item?.isApprovedUpload === false || item.fileUploaded == null ? (
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
                <Typography.Title level={2}>
                  Awaiting uploaded file approval
                </Typography.Title>
                <div className={s.cardsContainer}>
                  {data?.map((item, index) => {
                    return item.fileUploaded == true &&
                      item?.isApprovedUpload == null ? (
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
                  {data?.map((item, index) => {
                    return item.fileUploaded == true &&
                      item?.isApprovedUpload == true ? (
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
          selectedItem?.fileUploaded == true &&
          selectedItem?.isApprovedUpload != true
            ? [
                <Button
                  key="back"
                  danger
                  onClick={() => handleUpload(selectedItem)}
                >
                  Refuse
                </Button>,
                !success ? (
                <Button
                  key="submit"
                  disabled={fileList.length == 0}
                  type="primary"
                  onClick={() => handleUpload(selectedItem)}
                >
                  Upload
                </Button>) :(
                <Button
                  key="submit"
                  type="primary"
                  onClick={() => handleApprove(selectedItem)}
                >
                  Approve
                </Button>),
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>,
              ]
            : null
        }
      >
        <p>{`${selectedItem?.student}`}</p>
        <p>{`${selectedItem?.submissionDate}`}</p>
        <p>{`${selectedItem?.desription}`}</p>
        {selectedItem?.fileUploaded == true &&
        selectedItem?.isApprovedUpload != true ? (
          <a
            href={`http://localhost:8080/api/request/get/${selectedItem.userId}/${sessionID}`}
            download
          >
            <DownloadOutlined />
          </a>
        ) : null}
      </Modal>
    </div>
  );
}
