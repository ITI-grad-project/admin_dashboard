import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import notify from "../hooks/useNotification";
import { ToastContainer } from "react-toastify";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  // let initTableState = new Array(orders.length).fill(false);
  const [editMode, setEditMode] = useState([]);
  // const [tableState, setTableState] = useState(initTableState)
  const [status, setStatus] = useState([]);

  const BaseURL = "https://bekya.onrender.com";
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    async function getAllOrders() {
      try {
        const { data } = await axios.get(`${BaseURL}/api/v1/orders`, config);
        console.log(data.data);
        setOrders(data?.data);
        setEditMode(new Array(data?.data?.length).fill(false));
        // const allOrderStatus = data?.data?.map((order) => order?.orderStatus)
        // setStatus(allOrderStatus);
        // console.log(allOrderStatus);
        // console.log(status);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        console.log(error);
      }
    }
    getAllOrders();
  }, []);

  const toggleEditMode = (index) => {
    setEditMode((editMode) =>
      editMode.map((el, i) => (i === index ? !editMode[index] : el))
    );
  };
  const handleChangeStatus = async (e, index) => {
    // console.log(e.target.dataset.orderid);
    // console.log(e.target.value);
    // setStatus(new Array(orders.length).fill(orders[index].orderStatus));
    // console.log(status);
    const selectedValue = e.target.value;

    try {
      const { data } = await axios.put(
        `${BaseURL}/api/v1/orders/${e.target.dataset.orderid}/status`,
        { orderStatus: selectedValue },
        config
      );
      // update State
      // setStatus((status) =>
      //   status.map((el, i) => (i === index ? selectedValue : el))
      // );
      console.log({ ...orders[index], orderStatus: selectedValue });
      setOrders(
        orders.map((order, i) =>
          i === index ? { ...order, orderStatus: selectedValue } : order
        )
      );
      console.log(status);
      toggleEditMode(index); // (Make Edit Mode false) --> convert to view Mode
      notify("Order Status Updated Successfully", "success");
    } catch (error) {
      console.log(error);
      if (error.message === "Network Error") {
        notify("No Internet, Please check your connectivity", "error");
      }
      if (error.response.data.message) {
        notify(error.response.data.message, "error");
      }
      toggleEditMode(index); // (Make Edit Mode false) --> convert to view Mode
    }
  };

  const handleChangePay = async (e, index) => {
    try {
      const { data } = await axios.put(
        `${BaseURL}/api/v1/orders/${e.target.dataset.orderid}/pay`,
        {},
        config
      );
      // update State
      setOrders(
        orders.map((order, i) =>
          i === index ? { ...order, isPaid: true } : order
        )
      );
      toggleEditMode(index); // (Make Edit Mode false) --> convert to view Mode
      notify("Order Payment Updated Successfully", "success");
    } catch (error) {
      console.log(error);
      if (error.message === "Network Error") {
        notify("No Internet, Please check your connectivity", "error");
      }
      if (error.response.data.message) {
        notify(error.response.data.message, "error");
      }
      toggleEditMode(index); // (Make Edit Mode false) --> convert to view Mode
    }
  };

  const handleChangeDeliver = async (e, index) => {
    try {
      const { data } = await axios.put(
        `${BaseURL}/api/v1/orders/${e.target.dataset.orderid}/deliver`,
        {},
        config
      );
      // update State
      setOrders(
        orders.map((order, i) =>
          i === index ? { ...order, isDelivered: true } : order
        )
      );
      toggleEditMode(index); // (Make Edit Mode false) --> convert to view Mode
      notify("Order Delivery Updated Successfully", "success");
    } catch (error) {
      console.log(error);
      if (error.message === "Network Error") {
        notify("No Internet, Please check your connectivity", "error");
      }
      if (error.response.data.message) {
        notify(error.response.data.message, "error");
      }
      toggleEditMode(index); // (Make Edit Mode false) --> convert to view Mode
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="flex justify-between border-b border-base-300 p-2 items-center mb-4">
        <h1 className="font-bold text-lg uppercase text-center">Orders</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Created</th>
              <th>Customer</th>
              <th>Payment</th>
              <th>Delivered</th>
              {/* <th>Total</th> */}
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => (
              <tr key={order?._id}>
                <td className="w-32">{order?._id}</td>
                <td className="w-52">
                  {new Date(order?.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </td>
                <td>
                  <div className="flex gap-2 items-center">
                    <div className="avatar">
                      <div className="w-7 rounded-full">
                        <img
                          src={
                            order?.user?.profileImg ||
                            "https://www.pinclipart.com/picdir/big/394-3949395_stacey-scott-icono-de-mi-cuenta-png-clipart.png"
                          }
                          alt="user"
                        />
                      </div>
                    </div>
                    <h6 className="font-semibold ">{order?.user?.userName}</h6>
                  </div>
                </td>
                <td className="capitalize">
                  {!editMode[index] ? (
                    <span>{order.isPaid ? "Paid" : "Cash"}</span>
                  ) : (
                    <>
                      {!order.isPaid ? (
                        <select
                          data-orderid={order?._id}
                          onChange={(e) => handleChangePay(e, index)}
                          className="select select-bordered w-full max-w-xs h-[2rem] min-h-[2rem] capitalize"
                        >
                          <option disabled selected>
                            Cash
                          </option>
                          <option>Paid</option>
                        </select>
                      ) : (
                        <span>{order.isPaid ? "Paid" : "Cash"}</span>
                      )}
                    </>
                  )}
                </td>
                <td className="capitalize">
                  {!editMode[index] ? (
                    <span>{order.isDelivered ? "Yes" : "No"}</span>
                  ) : (
                    <>
                      {!order.isDelivered ? (
                        <select
                          data-orderid={order?._id}
                          onChange={(e) => handleChangeDeliver(e, index)}
                          className="select select-bordered w-full max-w-xs h-[2rem] min-h-[2rem] capitalize"
                        >
                          <option disabled selected>
                            No
                          </option>
                          <option>Yes</option>
                        </select>
                      ) : (
                        <span>{order.isDelivered ? "Yes" : "No"}</span>
                      )}
                    </>
                  )}
                </td>
                {/* <td>{order?.totalOrderPrice} EGP</td> */}
                <td className="capitalize">
                  {!editMode[index] ? (
                    <span className={`order-status ${!order?.cancelOrder ? order?.orderStatus : "canceled"}`}>
                      {!order?.cancelOrder ? order?.orderStatus : "Canceled"}
                    </span>
                  ) : (
                    <>
                    {/* {console.log(order.isPaid && order.isDelivered && order?.orderStatus !== "accepted")} */}
                    {/* {((order.isPaid && order.isDelivered && order?.orderStatus !== "accepted") || (order.isPaid && !order.isDelivered && order?.orderStatus !== "accepted")) ? ( */}
                         <select
                         data-orderid={order?._id}
                         onChange={(e) => handleChangeStatus(e, index)}
                         className="select select-bordered w-full max-w-xs h-[2rem] min-h-[2rem] capitalize"
                       >
                         <option disabled selected>
                           Pending
                         </option>
                         <option value="accepted">Accepted</option>
                         <option value="rejected">Rejected</option>
                       </select>
                    {/* ):( */}
                      {/* <span className={`order-status ${order?.orderStatus}`}>
                      {order?.orderStatus}
                    </span>
                    )} */}
                    </>
                 
                  )}
                </td>
                <td className="flex items-center gap-4">
                  <Link to={`/orderDetails/${order?._id}`}>
                    {/* <span className="capitalize bg-gray-100 hover:bg-gray-200 cursor-pointer px-5 py-2.5 font-semibold rounded">
                      More Details
                    </span> */}
                    <span className="text-green-600 text-lg">
                      <i className="fa-solid fa-eye"></i>
                    </span>
                  </Link>
                  {(((order?.isPaid && order?.isDelivered ) && order?.orderStatus === "accepted") || order?.cancelOrder) ? (
                     ""
                  ): (
                    <span
                    onClick={() => toggleEditMode(index)}
                    className="text-sky-600 text-lg cursor-pointer"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Orders;
