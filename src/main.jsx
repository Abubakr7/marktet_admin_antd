import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./routes/Error.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import Login from "./routes/Login";
import AuthCheck from "./utils/AuthCheck";
import ProtectRoute from "./utils/ProtectRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthCheck>
        <Login />
      </AuthCheck>
    ),
    errorElement: <Error />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectRoute>
        <AdminLayout />
      </ProtectRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <div>Hello World</div>,
      },
      {
        path: "products",
        element: <div>Hello Products</div>,
      },
      {
        path: "categories",
        element: <div>Hello Categories</div>,
      },
      {
        path: "brands",
        element: <div>Hello Brands</div>,
      },
      {
        path: "users",
        element: <div>Hello Users</div>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
