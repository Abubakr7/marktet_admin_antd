import { Button, Form, Input, Select, Typography } from "antd";
import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";

const { Option } = Select;

const { Title } = Typography;

const EditProduct = (props) => {
  const {
    product,
    onFinishUpdate,
    categories,
    subCategories,
    brands,
    value,
    setValue,
    setFile,
  } = props;
  const [form] = Form.useForm();

  if (!product.name) return null;

  return (
    <div>
      <Title level={2}>Edit Product</Title>
      <Form
        form={form}
        initialValues={product}
        name="edit"
        onFinish={onFinishUpdate}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          hasfeedback="true"
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
            hasfeedback="true"
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
            hasfeedback="true"
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
    </div>
  );
};

export default EditProduct;
