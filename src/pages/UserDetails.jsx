import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
function UserDetails() {
  const { UserId } = useParams();
  console.log(UserId);

  const [UserDetails, setUserDetails] = useState([]);
  const [UserProducts, setUserProducts] = useState([]);

  const BaseURL = "https://bekya.onrender.com";
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    async function getUserDetails() {
      const { data } = await axios.get(
        `${BaseURL}/api/v1/user/getUserDetails/${UserId}`,
        config
      );
      setUserDetails(data.data);
      console.log(data.data);
    }

    async function getUserProducts() {
      const { data } = await axios.get(
        `${BaseURL}/api/v1/products/?user=${UserId}`
      );
      setUserProducts(data.data);
      console.log("products", data.data);
    }
    getUserDetails();
    getUserProducts();
  }, []);
  return (
    <div>
      <h1 className="font-bold text-lg uppercase pt-16 mb-3">Users Details</h1>
      <div className="flex gap-3 flex-wrap">
        <div className="flex flex-col lg:w-[28%] gap-3 w-full">
          <div className="border p-3 rounded">
            {/* <h2 className="font-bold">Account Info</h2> */}
            <div className="mt-5 flex flex-col justify-center items-center">
              <img
                src={UserDetails?.profileImg}
                alt=""
                className="h-20 w-20 object-cover rounded-full"
              />
              <h3 className="mt-2 font-semibold">{UserDetails?.userName}</h3>
            </div>
            <div className="mb-3">
              <div className="flex gap-3 mt-3">
                <i className="fa-solid fa-envelope text-primary flex justify-center items-center"></i>
                <h4>{UserDetails?.email}</h4>
              </div>
              <div className="flex gap-3 mt-2">
                <i className="fa-solid fa-phone text-primary flex justify-center items-center"></i>
                <h4>{UserDetails?.phone}</h4>
              </div>
            </div>
          </div>
          <div className="border p-3 flex flex-col gap-4 rounded">
            <h2 className="font-bold pt-3">User Addresses</h2>
            {UserDetails?.addresses?.map((address, index) => {
              return (
                <>
                  <div className="relative">
                    <div className="bg-gray-100 absolute z-0 rounded p-2 text-[14px] w-full border-b-2">
                      #Address {index + 1}
                    </div>
                    <div className="relative border-2 p-3 pt-12 rounded z-[1]">
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-4">
                          <h3 className="text-gray-500">Alias: </h3>
                          <h4 className="font-semibold">{address?.alias}</h4>
                        </div>
                        <div className="flex gap-4">
                          <h3 className="text-gray-500">City: </h3>
                          <h4 className="font-semibold">{address?.city}</h4>
                        </div>
                        <div className="flex gap-4">
                          <h3 className="text-gray-500">Country: </h3>
                          <h4 className="font-semibold">{address?.country}</h4>
                        </div>
                        <div className="flex gap-4">
                          <h3 className="text-gray-500">Street: </h3>
                          <h4 className="font-semibold">{address?.street}</h4>
                        </div>
                        <div className="flex gap-4">
                          <h3 className="text-gray-500">Build No: </h3>
                          <h4 className="font-semibold">{address?.build_no}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col lg:w-[68%] w-full rounded gap-4">
          <div className="p-3 border">
            <h2 className="py-3 font-semibold">User Orders</h2>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-[16px]">
                    <th>ID</th>
                    <th>Item</th>
                    <th>Payment Info</th>
                    <th>Order Date</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={UserDetails?._id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="rounded-full w-12 h-12">
                            <img
                              src={UserDetails?.profileImg}
                              alt="Avatar Tailwind CSS Component"
                              className="object-cover object-center"
                            />
                          </div>
                        </div>
                        <div className="font-bold capitalize">
                          {UserDetails?.userName}
                        </div>
                      </div>
                    </td>
                    <td>{UserDetails?.createdAt}</td>
                    <td>{UserDetails?.email}</td>
                    <td>{UserDetails?.phone}</td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-3 border">
            <h2 className="py-3 font-semibold">User Products</h2>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-[16px]">
                    <th>ID</th>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Product Date</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {UserProducts?.map((product) => {
                    return (
                      <tr key={product?._id}>
                        <td>{product?._id}</td>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div className="avatar">
                              <div className="rounded-full w-12 h-12">
                                <img
                                  src={product?.images[0]?.image}
                                  alt="Avatar Tailwind CSS Component"
                                  className="object-cover object-center"
                                />
                              </div>
                            </div>
                            <div className="font-bold line-clamp-2">
                              {product?.title}
                            </div>
                          </div>
                        </td>
                        <td>{product?.category?.name}</td>
                        <td>{product?.createdAt}</td>
                        <td>{product?.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
