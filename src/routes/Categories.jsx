import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  patchCategory,
  postCategories,
} from "../api/categories";
import { EditFilled } from "@ant-design/icons";
import { getBrands } from "../api/brands";
import { singleFile } from "../api/files";

const { Option } = Select;

const { Title } = Typography;

const Categories = () => {
  const dispatch = useDispatch();
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [idx, setIdx] = useState(null);
  const [form] = Form.useForm();
  const [file, setFile] = useState("");
  const categories = useSelector(({ categories }) => categories.categories);
  const brands = useSelector(({ brands }) => brands.brands);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
    let category = { ...values };
    let formData = new FormData();
    formData.append("file", file);
    const data = await singleFile(formData);
    category.img = data.img;
    dispatch(postCategories(category));
    setAddModal(false);
  };
  const onFinishUpdate = async (values) => {
    if (file.length === 0) return alert("Please select img");
    let category = { ...values };
    let formData = new FormData();
    formData.append("file", file);
    const data = await singleFile(formData);
    category.img = data.img;
    dispatch(patchCategory({ category, id: idx }));
    setEditModal(false);
  };
  useEffect(() => {
    if (brands.length === 0) {
      dispatch(getBrands());
    }
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <div>
      <Title level={2}>Categories</Title>
      <Button type="primary" onClick={() => setAddModal(true)}>
        add
      </Button>
      <Divider />
      <Table
        rowKey={(row) => row.id}
        dataSource={categories}
        columns={columns}
      />
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

export default Categories;
