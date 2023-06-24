import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import useGuard from "./hooks/guard";
import ProtectRoute from "./hooks/protectRoute";

import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import AddCategory from "./pages/AddCategory";
import OrderDetails from "./pages/OrderDetails";
import UserDetails from "./pages/UserDetails";
import ProductDetails from "./pages/productDetails";

function App() {
  const [logged] = useGuard();

  const [categoriesList, setCategoriesList] = useState([]);

  const BaseURL = "https://bekya.onrender.com";
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    async function getAllCategories() {
      const { data } = await axios.get(`${BaseURL}/api/v1/categories`);
      setCategoriesList(data.data);
      console.log(data.data);
    }
    getAllCategories();
  }, []);
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login logged={logged} />} />
          <Route element={<Layout />}>
            <Route element={<ProtectRoute auth={logged} />}>
              <Route path="/" element={<Home />} />
              <Route path="/orders" element={<Orders />} />
              <Route
                path="/orders/orderDetails/:orderID"
                element={<OrderDetails />}
              />
              <Route
                path="/categories"
                element={
                  <Categories
                    categoriesList={categoriesList}
                    setCategoriesList={setCategoriesList}
                    BaseURL={BaseURL}
                    config={config}
                  />
                }
              />
              <Route
                path="/categories/addcategory/:id"
                element={
                  <AddCategory
                    BaseURL={BaseURL}
                    token={token}
                    setCategoriesList={setCategoriesList}
                    categoriesList={categoriesList}
                  />
                }
              />
              <Route
                path="/products"
                element={
                  <Products Categories={categoriesList} BaseURL={BaseURL} />
                }
              />
              <Route path="/users" element={<Users />} />
              <Route
                path="/users/userDetails/:UserId"
                element={<UserDetails />}
              ></Route>
              <Route
                path="/products/productDetails/:productId"
                element={<ProductDetails />}
              ></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
