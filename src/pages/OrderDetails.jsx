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
        {/* <div>

        </div> */}
        <div className="col-span-10 lg:col-span-5 2xl:col-span-5 flex flex-col justify-between items-center gap-4">
          {/* Shipping Address */}
          <div className="border border-gray-200 rounded-md w-full p-3">
            <h4 className="text-lg font-bold mb-4">Shipping Address</h4>
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Building No:</span>
                <span className="font-semibold">Country:</span>
                <span className="font-semibold">Governorate:</span>
                <span className="font-semibold">City:</span>
                <span className="font-semibold">Street:</span>
                <span className="font-semibold">Alias:</span>
                <span className="font-semibold">Phone:</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="capitalize">{order?.shippingAddress?.build_no}</div>
                <div className="capitalize">{order?.shippingAddress?.country}</div>
                <div className="capitalize">{order?.shippingAddress?.governorate}</div>
                <div className="capitalize">{order?.shippingAddress?.city}</div>
                <div className="capitalize">{order?.shippingAddress?.street}</div>
                {/* <div className="capitalize"> */}
                  {/* {order?.shippingAddress?.street},{" "}
                  {order?.shippingAddress?.city},{" "}
                  {order?.shippingAddress?.governorate},{" "}
                  {order?.shippingAddress?.country} */}
                  
                  {/* {order?.shippingAddress?.street && <span>{order?.shippingAddress?.street}</span>}
                  {order?.shippingAddress?.city && <span>,{" "}{order?.shippingAddress?.city}</span>}
                  {order?.shippingAddress?.governorate && <span>,{" "}{order?.shippingAddress?.governorate}</span>}
                  {order?.shippingAddress?.country && <span>,{" "} {order?.shippingAddress?.country}</span>} */}
                {/* </div> */}
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
        </div>
        <div className="col-span-10 lg:col-span-5 2xl:col-span-5 flex flex-col justify-between items-center gap-4">
        <div className="border border-gray-200 rounded-md w-full p-3 h-full">
            <div className="flex justify-between mb-3">
              <h4 className="text-lg font-bold">Order Details</h4>
              {!order?.cancelOrder ?( <span className={`order-status ${order?.orderStatus}`}>
                {order?.orderStatus}
              </span>): ( <span className={`order-status canceled`}>Canceled</span>)}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col justify-center gap-2">
                <div className="font-semibold">ID:</div>
                <div className="font-semibold">Created:</div>
                {/* <div className="font-semibold">Status:</div> */}
                <div className="font-semibold">Payment:</div>
                <div className="font-semibold">Method:</div>
                <div className="font-semibold">Delivered:</div>
                <div className="font-semibold">Total:</div>
              </div>
              <div className="flex flex-col justify-center gap-2">
                <div>{order?._id}</div>
                <div>   {new Date(order?.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}</div>
                {/* <div className={`order-status ${order?.orderStatus}`}>{order?.orderStatus}</div> */}
                <div>{order?.isPaid ? "Paid" : "Not Paid"}</div>
                <div className="capitalize">{order?.paymentMethod}</div>
                <div>{order?.isDelivered ? "Yes" : "No"}</div>
                <div>{order?.totalOrderPrice} EGP</div>
              </div>
            </div>
          </div>
        </div>
      
        <div className="col-span-10 lg:col-span-10 2xl:col-span-10 rounded">
       {/* Order Details Table */}
       <div className="border border-gray-200 rounded-md w-full p-3">
            <h4 className="text-lg font-bold mb-2">Order Items</h4>
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
      </div>
    </>
  );
}
