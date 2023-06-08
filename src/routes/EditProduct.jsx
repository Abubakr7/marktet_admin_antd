import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getBrands } from "../api/brands";
import { getCategories } from "../api/categories";
import { multiFiles } from "../api/files";
import { getProductById, getProducts, patchProduct } from "../api/products";
import { getSubCategories } from "../api/subCategories";
import View from "../components/EditProduct";
import { useState } from "react";
import { useEffect } from "react";

const EditProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector(({ products }) => products.product);
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [updateFiles, setUpdateFiles] = useState([]);
  const subCategories = useSelector(
    ({ subCategories }) => subCategories.subCategories
  );
  const categories = useSelector(({ categories }) => categories.categories);
  const brands = useSelector(({ brands }) => brands.brands);
  const { id } = useParams();
  const [file, setFile] = useState("");

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
      dispatch(
        patchProduct({
          product,
          id: id,
          callback: () => {
            navigate(-1);
          },
        })
      );
      return;
    }

    product.media = updateFiles;
    dispatch(
      patchProduct({
        product,
        id: id,
        callback: () => {
          navigate(-1);
        },
      })
    );
  };

  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getSubCategories());
    if (product.name) {
      setUpdateFiles(product.media);
      setValue(product.description);
    }
  }, [dispatch, id, product]);
  if (!product.name) return null;
  return (
    <div>
      <View
        onFinishUpdate={onFinishUpdate}
        product={product}
        categories={categories}
        subCategories={subCategories}
        brands={brands}
        value={value}
        setValue={setValue}
        setFile={setFile}
      />
    </div>
  );
};

export default EditProduct;
