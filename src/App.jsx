import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import AddCategory from "./pages/AddCategory";
import UserDetails from "./pages/UserDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/addcategory/:id" element={<AddCategory />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route
              path="/users/userDetails/:UserId"
              element={<UserDetails />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
