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
  Carousel,
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { useLocation, useNavigate } from "react-router-dom";

const { Option } = Select;

const { Title } = Typography;

const Products = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [addModal, setAddModal] = useState(false);
  const loading = useSelector(({ products }) => products.loading);
  const [visible, setVisible] = useState(false);
  const [idx, setIdx] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [form] = Form.useForm();
  const subCategories = useSelector(
    ({ subCategories }) => subCategories.subCategories
  );
  const [value, setValue] = useState("");
  const products = useSelector(({ products }) => products.products);
  const [file, setFile] = useState([]);
  const [updateFiles, setUpdateFiles] = useState([]);

  const categories = useSelector(({ categories }) => categories.categories);
  const brands = useSelector(({ brands }) => brands.brands);
  const onFinish = async (values) => {
    if (file.length === 0) return alert("Please select img");
    let product = { ...values };
    product.description = value;
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
    let product = { ...values };
    product.description = value;

    if (file.length > 0) {
      let formData = new FormData();

      for (let f of file) {
        formData.append("files", f);
      }
      const data = await multiFiles(formData);
      let arr = [...updateFiles];
      for (let img of data.img) {
        let obj = {
          type: img.mimetype,
          src: img.path,
        };
        arr.push(obj);
      }

      product.media = arr;
      dispatch(patchProduct({ product, id: idx }));
      setEditModal(false);
      return;
    }
    console.log(updateFiles);
    product.media = updateFiles;
    dispatch(patchProduct({ product, id: idx }));
    setEditModal(false);
  };
  const onChange = (currentSlide) => {
    console.log(currentSlide);
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
        console.log(media.length);
        return (
          <>
            {media.length > 0 && (
              <div style={{ width: "100px", height: "100px" }}>
                <Carousel afterChange={onChange}>
                  {media.map((elem) => {
                    return (
                      <div key={elem.src}>
                        <img
                          src={`${import.meta.env.VITE_APP_API_URL_FILES}${
                            elem.src
                          }`}
                          alt="photo"
                          style={{ maxWidth: "100%" }}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            )}
            {/* {media?.length > 0 && (
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
                      key={elem.src}
                      src={`${import.meta.env.VITE_APP_API_URL_FILES}${
                        elem.src
                      }`}
                    />
                  );
                })}
              </Image.PreviewGroup>
            </div> */}
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
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (desc) => {
        return <ReactQuill theme="bubble" readOnly value={desc} />;
      },
    },
    {
      title: "SubCategory",
      dataIndex: "subCategoryId",
      key: "subCategoryId",
      render: (id) => {
        return subCategories?.find((elem) => elem?.id == id)?.name;
      },
    },

    {
      title: "Brand",
      dataIndex: "brandId",
      key: "brandId",
      render: (brand) => {
        console.log(brand);
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
                navigate(`${pathname}/edit/${row.id}`, {
                  state: row,
                });
              }}
            />
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => dispatch(removeProduct(row.id))}
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
      <Button
        type="primary"
        onClick={() => {
          navigate(`${pathname}/add`);
        }}
      >
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
          <Form.Item label="Category" name="subCategoryId">
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
          <Form.Item label="Brand" name="brandId">
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
            style={{ marginBottom: 10 }}
            multiple
            onChange={(e) => {
              setFile(e.target.files);
            }}
          />
          <ReactQuill
            theme="snow"
            style={{ marginBottom: 10 }}
            value={value}
            onChange={setValue}
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
          <Form.Item label="Sub Category" name="subCategoryId">
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
          <Form.Item label="Brand" name="brandId">
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
          <ReactQuill theme="snow" value={value} onChange={setValue} />
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
