import React from "react";
import { Outlet } from "react-router-dom";

const ProductsLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProductsLayout;
