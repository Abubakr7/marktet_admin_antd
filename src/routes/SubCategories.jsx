import { DeleteFilled, EditFilled } from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Table,
  Tag,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../api/brands";
import { getCategories } from "../api/categories";
import { singleFile } from "../api/files";
import {
  getSubCategories,
  patchSubCategory,
  postSubCategory,
  removeSubCategory,
} from "../api/subCategories";

const { Option } = Select;

const { Title } = Typography;

const SubCategories = () => {
  const dispatch = useDispatch();
  const [addModal, setAddModal] = useState(false);
  const loading = useSelector(({ subCategories }) => subCategories.loading);
  const [idx, setIdx] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [form] = Form.useForm();
  const subCategories = useSelector(
    ({ subCategories }) => subCategories.subCategories
  );
  const [file, setFile] = useState("");

  const categories = useSelector(({ categories }) => categories.categories);
  const brands = useSelector(({ brands }) => brands.brands);
  const onFinish = async (values) => {
    if (file.length === 0) return alert("Please select img");
    let subCategory = { ...values };
    let formData = new FormData();
    formData.append("file", file);
    const data = await singleFile(formData);
    subCategory.img = data.img;
    dispatch(postSubCategory(subCategory));
    setAddModal(false);
  };
  const onFinishUpdate = async (values) => {
    if (file.length === 0) {
      let subCategory = { ...values };
      dispatch(patchSubCategory({ subCategory, id: idx }));
      setEditModal(false);
      return;
    }
    let subCategory = { ...values };
    let formData = new FormData();
    formData.append("file", file);
    const data = await singleFile(formData);
    subCategory.img = data.img;
    dispatch(patchSubCategory({ subCategory, id: idx }));
    setEditModal(false);
  };
  useEffect(() => {
    if (brands.length === 0) {
      dispatch(getBrands());
    }
    if (categories.length === 0) {
      dispatch(getCategories());
    }

    dispatch(getSubCategories());
  }, [dispatch]);

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
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (id) => {
        return categories?.find((elem) => elem?.id == id)?.name;
      },
    },
    {
      title: "Brands",
      dataIndex: "brands",
      key: "brands",
      render: (brand) => {
        return (
          <>
            {brand.length > 0 &&
              brand.map((elem) => {
                let brand = brands.find((item) => item.id == elem);
                return <Tag key={elem}>{brand?.name}</Tag>;
              })}
          </>
        );
      },
    },
    {
      title: "Action",
      render: (row) => {
        return (
          <>
            <EditFilled
              style={{ cursor: "pointer", fontSize: 25, marginRight: 5 }}
              onClick={() => {
                form.setFieldsValue({
                  name: row.name,
                  categoryId: row.categoryId,
                  brands: row.brands,
                });
                setIdx(row.id);
                setEditModal(true);
              }}
            />
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => dispatch(removeSubCategory(row.id))}
            >
              <DeleteFilled style={{ cursor: "pointer", fontSize: 25 }} />
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Title level={2}>Sub Categories</Title>
      <Button type="primary" onClick={() => setAddModal(true)}>
        add
      </Button>
      <Divider />
      <Table
        loading={loading}
        rowKey={(row) => row.id}
        dataSource={subCategories}
        columns={columns}
      />
      <Modal
        title="Add Modal"
        open={addModal}
        footer={false}
        onCancel={() => setAddModal(false)}
        destroyOnClose
      >
        <Form
          name="add"
          onFinish={onFinish}
          initialValues={{
            brands: [],
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your name of Sub Category!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="categoryId">
            <Select
              placeholder="Please select category"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please select category!",
                },
              ]}
            >
              {categories.length > 0 &&
                categories.map((elem) => {
                  return (
                    <Option key={elem.id} value={elem.id}>
                      {elem.name}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item label="Brands" name="brands">
            <Select mode="multiple" placeholder="Please select brand">
              {brands.length > 0 &&
                brands.map((elem) => {
                  return (
                    <Option key={elem.id} value={elem.id}>
                      {elem.name}
                    </Option>
                  );
                })}
            </Select>
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
                message: "Please input your name of Brand!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="categoryId">
            <Select
              placeholder="Please select category"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please select category!",
                },
              ]}
            >
              {categories.length > 0 &&
                categories.map((elem) => {
                  return (
                    <Option key={elem.id} value={elem.id}>
                      {elem.name}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item label="Brands" name="brands">
            <Select mode="multiple" placeholder="Please select brand">
              {brands.length > 0 &&
                brands.map((elem) => {
                  return (
                    <Option key={elem.id} value={elem.id}>
                      {elem.name}
                    </Option>
                  );
                })}
            </Select>
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

export default SubCategories;
