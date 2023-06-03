import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./routes/Error.jsx";
import AdminLayout from "./layout/AdminLayout.jsx";
import Login from "./routes/Login";
import AuthCheck from "./utils/AuthCheck";
import ProtectRoute from "./utils/ProtectRoute";
import Categories from "./routes/Categories";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Brands from "./routes/Brands";
import SubCategories from "./routes/SubCategories";

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
        element: (
          <div>
            Hello Products
            <Outlet />
          </div>
        ),
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "subCategories",
        element: <SubCategories />,
      },
      {
        path: "brands",
        element: <Brands />,
      },
      {
        path: "users",
        element: <div>Hello Users</div>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
