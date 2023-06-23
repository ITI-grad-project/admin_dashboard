import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderDetails() {
  const { orderID } = useParams();
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(true);

  const BaseURL = "https://bekya.onrender.com";
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    async function getOrderByID() {
      try {
        const { data } = await axios.get(
          `${BaseURL}/api/v1/orders/${orderID}`,
          config
        );
        console.log(data.data);
        setOrder(data?.data);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        console.log(error);
      }
    }
    getOrderByID();
  }, []);

  return (
    <>
      <div className="grid grid-cols-10 lg:grid-cols-10 gap-6">
        <div className="col-span-10 lg:col-span-6 2xl:col-span-6 flex flex-col justify-between items-center gap-4">
          {/* Shipping Address */}
          <div className="border border-gray-200 rounded-md w-full p-3">
            <h4 className="text-lg font-bold mb-4">Shipping Address</h4>
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Building No:</span>
                <span className="font-semibold">Address:</span>
                <span className="font-semibold">Alias:</span>
                <span className="font-semibold">Phone:</span>
              </div>
              <div className="flex flex-col gap-2">
                <div>{order?.shippingAddress?.build_no}</div>
                <div className="capitalize">
                  {order?.shippingAddress?.street},{" "}
                  {order?.shippingAddress?.city},{" "}
                  {order?.shippingAddress?.governorate},{" "}
                  {order?.shippingAddress?.country}
                  {/* {order?.shippingAddress?.street && <span>{order?.shippingAddress?.street}</span>}
                  {order?.shippingAddress?.city && <span>,{" "}{order?.shippingAddress?.city}</span>}
                  {order?.shippingAddress?.governorate && <span>,{" "}{order?.shippingAddress?.governorate}</span>}
                  {order?.shippingAddress?.country && <span>,{" "} {order?.shippingAddress?.country}</span>} */}
                </div>
                <div>{order?.shippingAddress?.alias}</div>
                <div>{order?.shippingAddress?.phone}</div>
              </div>
            </div>

            {/* <div className="flex flex-col gap-2">
              <div className="flex items-center gap-6">
                <span className="font-semibold">Building No:</span>
                <div>{order?.shippingAddress?.build_no}</div>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-semibold">Address:</span>
                <div>
                  {order?.shippingAddress?.street},{" "}
                  {order?.shippingAddress?.city},{" "}
                  {order?.shippingAddress?.governorate},{" "}
                  {order?.shippingAddress?.country}
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-semibold">Alias:</span>
                <div>{order?.shippingAddress?.alias}</div>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-semibold">Phone:</span>
                <div>{order?.shippingAddress?.phone}</div>
              </div>
            </div> */}
          </div>
          {/* Order Details Table */}
          <div className="border border-gray-200 rounded-md w-full p-3">
            <h4 className="text-lg font-bold mb-2">Order Summary</h4>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.cartItems?.map((item) => (
                    <tr key={item?._id}>
                      <td className="w-24">
                        <div className="avatar">
                          <div className="w-24 rounded-xl">
                            <img
                              src={item?.product?.images[0]?.image}
                              alt="product"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="w-40 whitespace-normal capitalize">
                        {item?.product?.title}
                      </td>
                      <td className="capitalize">
                          {item?.product?.category?.name}
                      </td>
                      <td className="w-30">{item?.product?.price} EGP</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-span-10 lg:col-span-4 2xl:col-span-4 rounded"></div>
      </div>
    </>
  );
}
