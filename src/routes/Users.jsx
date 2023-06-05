import { Button, Divider, Form, Input, Modal, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, patchUsers, postUsers } from "../api/users";
import { singleFile } from "../api/files";
import { EditFilled } from "@ant-design/icons";

const { Title } = Typography;

const Users = () => {
  const dispatch = useDispatch();
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [file, setFile] = useState("");
  const [idx, setIdx] = useState(null);
  const users = useSelector(({ users }) => users.users);
  const [form] = Form.useForm();
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Photo",
      dataIndex: "img",
      key: "img",
      render: (img) => {
        return (
          <img
            src={`${import.meta.env.VITE_APP_API_URL_FILES}${img}`}
            alt="img"
            width={60}
            height={60}
          />
        );
      },
    },
    {
      title: "Action",
      render: (row) => {
        return (
          <EditFilled
            style={{ cursor: "pointer", fontSize: 25 }}
            onClick={() => {
              form.setFieldsValue({
                name: row.name,
              });
              setIdx(row.id);
              setEditModal(true);
            }}
          />
        );
      },
    },
  ];
  const onFinish = async (values) => {
    if (file.length === 0) return alert("Please select img");
    let brand = { ...values };
    let formData = new FormData();
    formData.append("file", file);
    const data = await singleFile(formData);
    brand.img = data.img;
    dispatch(postUsers(brand));
    setAddModal(false);
  };
  const onFinishUpdate = async (values) => {
    if (file.length === 0) return alert("Please select img");
    let brand = { ...values };
    let formData = new FormData();
    formData.append("file", file);
    const data = await singleFile(formData);
    brand.img = data.img;
    dispatch(patchUsers({ brand, id: idx }));
    setEditModal(false);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <div>
      <Title level={2}>Users</Title>
      <Button type="primary" onClick={() => setAddModal(true)}>
        add
      </Button>
      <Divider />
      <Table rowKey={(row) => row.id} dataSource={users} columns={columns} />
      <Modal
        title="Add Modal"
        open={addModal}
        footer={false}
        onCancel={() => setAddModal(false)}
        destroyOnClose
      >
        <Form name="add" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Name"
            name="name"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your name of Brand!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <input
            type="file"
            name="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Modal"
        open={editModal}
        footer={false}
        getContainer={false}
        onCancel={() => setEditModal(false)}
        destroyOnClose
      >
        <Form
          form={form}
          name="edit"
          onFinish={onFinishUpdate}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your name of Category!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <input
            type="file"
            name="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
