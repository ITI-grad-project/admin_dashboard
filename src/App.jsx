import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import AddCategory from "./pages/AddCategory";
import OrderDetails from "./pages/OrderDetails";

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

function App() {
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
          <Route index path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orderDetails/:orderID" element={<OrderDetails />} />
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
              path="/addcategory/:id"
              element={
                <AddCategory
                  BaseURL={BaseURL}
                  token={token}
                  setCategoriesList={setCategoriesList}
                  categoriesList={categoriesList}
                />
              }
            />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
