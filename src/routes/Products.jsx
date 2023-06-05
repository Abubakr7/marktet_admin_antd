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
  Image,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../api/brands";
import { getCategories } from "../api/categories";
import { getSubCategories } from "../api/subCategories";
import { multiFiles, singleFile } from "../api/files";
import {
  getProducts,
  patchProduct,
  postProduct,
  removeProduct,
} from "../api/products";

const { Option } = Select;

const { Title } = Typography;

const Products = () => {
  const dispatch = useDispatch();
  const [addModal, setAddModal] = useState(false);
  const loading = useSelector(({ products }) => products.loading);
  const [visible, setVisible] = useState(false);
  const [idx, setIdx] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [form] = Form.useForm();
  const subCategories = useSelector(
    ({ subCategories }) => subCategories.subCategories
  );
  const products = useSelector(({ products }) => products.products);
  const [file, setFile] = useState([]);

  const categories = useSelector(({ categories }) => categories.categories);
  const brands = useSelector(({ brands }) => brands.brands);
  const onFinish = async (values) => {
    if (file.length === 0) return alert("Please select img");
    let product = { ...values };
    let formData = new FormData();

    for (let f of file) {
      formData.append("files", f);
    }
    const data = await multiFiles(formData);
    let arr = [];
    for (let img of data.img) {
      let obj = {
        type: img.mimetype,
        src: img.path,
      };
      arr.push(obj);
    }

    product.media = arr;
    dispatch(postProduct(product));
    setAddModal(false);
  };
  const onFinishUpdate = async (values) => {
    if (file.length === 0) return alert("Please select img");
    let subCategory = { ...values };
    let formData = new FormData();
    formData.append("file", file);
    const data = await singleFile(formData);
    subCategory.img = data.img;
    dispatch(patchProduct({ subCategory, id: idx }));
    setEditModal(false);
  };
  useEffect(() => {
    if (brands.length === 0) {
      dispatch(getBrands());
    }
    if (categories.length === 0) {
      dispatch(getCategories());
    }
    if (subCategories.length === 0) {
      dispatch(getSubCategories());
    }

    dispatch(getProducts());
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
      dataIndex: "media",
      key: "media",

      render: (media) => {
        console.log(media);
        return (
          <>
            {media?.length > 0 && (
              <Image
                preview={{
                  visible: false,
                }}
                width={60}
                height={60}
                src={`${import.meta.env.VITE_APP_API_URL_FILES}${media[0].src}`}
                onClick={() => setVisible(true)}
              />
            )}
            <div
              style={{
                display: "none",
              }}
            >
              <Image.PreviewGroup
                preview={{
                  visible,
                  onVisibleChange: (vis) => setVisible(vis),
                }}
              >
                {media?.map((elem) => {
                  return (
                    <Image
                      src={`${import.meta.env.VITE_APP_API_URL_FILES}${
                        elem.src
                      }`}
                    />
                  );
                })}
              </Image.PreviewGroup>
            </div>
          </>
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
      title: "SubCategory",
      dataIndex: "subcategoryId",
      key: "subcategoryId",
      render: (id, row) => {
        console.log(row);
        return subCategories?.find((elem) => elem?.categoryId == row.categoryId)
          ?.name;
      },
    },

    {
      title: "Brand",
      dataIndex: "brandId",
      key: "brandId",
      render: (brand) => {
        const name = brands?.find((elem) => elem.id === brand)?.name;
        return (
          <>
            <Tag>{name}</Tag>
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
      <Title level={2}>Products</Title>
      <Button type="primary" onClick={() => setAddModal(true)}>
        add
      </Button>
      <Divider />
      <Table
        loading={loading}
        rowKey={(row) => row.id}
        dataSource={products}
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
              {categories?.length > 0 &&
                categories.map((elem) => {
                  return (
                    <Option key={elem.id} value={elem.id}>
                      {elem.name}
                    </Option>
                  );
                })}
            </Select>
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
              {subCategories.length > 0 &&
                subCategories.map((elem) => {
                  return (
                    <Option key={elem.id} value={elem.id}>
                      {elem.name}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item label="Brands" name="brands">
            <Select placeholder="Please select brand">
              {brands?.length > 0 &&
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
            multiple
            onChange={(e) => {
              setFile(e.target.files);
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
              {categories?.length > 0 &&
                categories.map((elem) => {
                  return (
                    <Option key={elem.id} value={elem.id}>
                      {elem.name}
                    </Option>
                  );
                })}
            </Select>
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
              {subCategories.length > 0 &&
                subCategories.map((elem) => {
                  return (
                    <Option key={elem.id} value={elem.id}>
                      {elem.name}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item label="Brands" name="brands">
            <Select placeholder="Please select brand">
              {brands?.length > 0 &&
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
            multiple
            onChange={(e) => {
              setFile(e.target.files);
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

export default Products;