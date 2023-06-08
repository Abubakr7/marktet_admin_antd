import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getBrands } from "../api/brands";
import { getCategories } from "../api/categories";
import { multiFiles } from "../api/files";
import { getProducts, postProduct } from "../api/products";
import { getSubCategories } from "../api/subCategories";

const { Option } = Select;

const { Title } = Typography;

const AddProduct = () => {
  const dispatch = useDispatch();
  const loading = useSelector(({ products }) => products.loading);
  const navigate = useNavigate();
  const subCategories = useSelector(
    ({ subCategories }) => subCategories.subCategories
  );
  const [colors, setColors] = useState([]);
  const [value, setValue] = useState("");
  const [file, setFile] = useState([]);
  const categories = useSelector(({ categories }) => categories.categories);
  const brands = useSelector(({ brands }) => brands.brands);
  const onFinish = async (values) => {
    if (file.length === 0) return alert("Please select img");
    let product = { ...values };
    product.description = value;
    product.colors = colors;
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
    dispatch(
      postProduct({
        product,
        callback: () => {
          navigate(-1);
        },
      })
    );
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
  return (
    <div>
      <Title level={2}>Add Product</Title>
      <Form
        name="add"
        onFinish={onFinish}
        initialValues={{
          brands: [],
        }}
        autoComplete="off"
      >
        <Row gutter={[8, 8]}>
          <Col span={6}>
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
          </Col>
          <Col span={6}>
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
          </Col>
          <Col span={6}>
            <Form.Item label="Subcategory" name="subCategoryId">
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
          </Col>
          <Col span={6}>
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
          </Col>
          <Col span={6}>
            {colors.length > 0 &&
              colors.map((elem) => {
                return (
                  <Tag
                    key={elem}
                    closable
                    style={{ background: elem }}
                    onClose={() => {
                      const co = colors.filter((el) => el !== elem);
                      setColors(co);
                    }}
                  >
                    {elem}
                  </Tag>
                );
              })}
            <form
              onSubmit={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <input
                type="text"
                name="color"
                onBlur={(e) => {
                  const target = e.target;
                  const co = [...colors];
                  co.push(target.value);
                  setColors(co);
                }}
              />
            </form>
          </Col>
          <Col span={12}>
            <h1>Proccesor</h1>
            <Form.List name="proc">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: "flex",
                        marginBottom: 8,
                      }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "key"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing key",
                          },
                        ]}
                      >
                        <Input placeholder="key" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "value"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing value",
                          },
                        ]}
                      >
                        <Input placeholder="value" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
          <Col span={12}>
            <h1>Sputnik</h1>
            <Form.List name="sputnik">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: "flex",
                        marginBottom: 8,
                      }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "key"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing key",
                          },
                        ]}
                      >
                        <Input placeholder="key" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "value"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing value",
                          },
                        ]}
                      >
                        <Input placeholder="value" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
        </Row>

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
    </div>
  );
};

export default AddProduct;
