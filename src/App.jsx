import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import AddCategory from "./pages/AddCategory";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
// import { ColorModeContext, useMode } from "../theme";
// import { CssBaseline, ThemeProvider } from "@mui/material";
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
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route
              path="/categories"
              element={
                <Categories
                  categoriesList={categoriesList}
                  setCategoriesList={setCategoriesList}
                  config={config}
                  BaseURL={BaseURL}
                />
              }
            />
            <Route path="/addcategory/:id" element={<AddCategory />} />
            <Route
              path="/products"
              element={
                <Products Categories={categoriesList} BaseURL={BaseURL} />
              }
            />
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
