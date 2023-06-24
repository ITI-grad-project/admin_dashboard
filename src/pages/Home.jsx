import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { useState, useEffect } from "react";
import axios from "axios";
// import { ResponsiveChoropleth } from "@nivo/geo";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
function Home() {
  ///
  const data = {
    labels: [
      "June 10",
      "June 11",
      "June 12",
      "June 13",
      "June 14",
      "June 15",
      "June 16",
      "June 17",
    ],
    datasets: [
      {
        data: [8, 7.8, 6, 9, 6, 7, 5, 6],
        backgroundColor: "transparent",
        borderColor: "#F2C76E",
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
        tension: 0.5,
      },
    ],
  };
  const options = {
    Plugins: {
      legend: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 2,
        max: 10,
        ticks: {
          stepSize: 2,
          callback: (value) => value + "k",
        },
        grid: {
          borderDash: [10],
        },
      },
    },
  };
  const data2 = {
    labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
    datasets: [
      {
        label: "My First Dataset",
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
  };
  const config = {
    type: "polarArea",
    data: data2,
    options: {},
  };

  const [LatestOrders, setLatestOrders] = useState([]);
  useEffect(() => {
    async function getOrders() {
      const { data } = await axios.get(
        "https://bekya.onrender.com/api/v1/orders",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLatestOrders(data.data);
      console.log("orders", data.data);
      console.log(data.data);
    }

    getOrders();
  }, []);

  return (
    <>
      <div>
        <div className="flex gap-6 justify-center mb-8 flex-wrap">
          <div className="bg-[#EBF3FE] xl:w-[14%] lg:w-[20%] w-[28%] p-8 rounded flex flex-col justify-center items-center text-[#2100C4] text-[14px] font-[600]">
            <img
              src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-user-male.svg"
              alt=""
            />
            <h3 className="mt-2">Users</h3>
            <h3>50</h3>
          </div>
          <div className="bg-[#FEF5E5] xl:w-[14%] lg:w-[20%] w-[28%] p-8 rounded flex flex-col justify-center items-center text-[#FFB252] text-[14px] font-[600]">
            <img
              src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-briefcase.svg"
              alt=""
            />
            <h3 className="mt-2">Admins</h3>
            <h3>5</h3>
          </div>
          <div className="bg-[#EBF3FE] xl:w-[14%] lg:w-[20%] w-[28%] p-8 rounded flex flex-col justify-center items-center text-[#539BFF] text-[14px] font-[600]">
            <img
              src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-connect.svg"
              alt=""
            />
            <h3 className="mt-2">Reports</h3>
            <h3>8</h3>
          </div>
          <div className="bg-[#FBF2EF] xl:w-[14%] lg:w-[20%] w-[28%] p-8 rounded flex flex-col justify-center items-center text-[#FA896B] text-[14px] font-[600]">
            <img
              src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-mailbox.svg"
              alt=""
            />
            <h3 className="mt-2">Products</h3>
            <h3>30</h3>
          </div>
          <div className="bg-[#E6FFFA] xl:w-[14%] lg:w-[20%] w-[28%] p-8 rounded flex flex-col justify-center items-center text-[#35DEB9] text-[14px] font-[600]">
            <img
              src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-speech-bubble.svg"
              alt=""
            />
            <h3 className="mt-2">Orders</h3>
            <h3>22</h3>
          </div>
          <div className="bg-yellow-100 xl:w-[14%] lg:w-[20%] w-[28%] p-8 rounded flex flex-col justify-center items-center text-yellow-500 text-[14px] font-[600]">
            <img
              src="https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/svgs/icon-favorites.svg"
              alt=""
            />
            <h3 className="mt-2">Categories</h3>
            <h3>5</h3>
          </div>
        </div>

        <div className="stats shadow flex justify-between ">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <i className="fa-solid fa-hand-holding-dollar text-4xl text-primary"></i>
            </div>
            <div className="stat-title text-primary">Revenue</div>
            <div className="stat-value ">31K</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <i class="fa-solid fa-users text-4xl text-primary"></i>
            </div>
            <div className="stat-title text-primary">New Users</div>
            <div className="stat-value">4,200</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <i class="fa-solid fa-box-open text-4xl text-primary"></i>
            </div>
            <div className="stat-title text-primary">New Products</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>
      <div
        style={{ width: "100%", height: "600px" }}
        className="mt-10 border rounded shadow p-10  "
      >
        <div className="flex-col justify-center items-center">
          <h1 className="font-bold text-lg text-primary uppercase mt-4 mb-4">
            Shopping Status
          </h1>
          <Line data={data} options={options}></Line>
        </div>
      </div>
      <div className="smt-10 border rounded shadow p-10 mt-10">
        <h1 className="font-bold text-lg text-primary uppercase mt-4 mb-4">
          Latest Orders
        </h1>

        <div className="overflow-x-auto">
          <table className="table text-center">
            <thead>
              <tr>
                <th>Item</th>
                <th>Payment Info</th>
                <th>Order Date</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {LatestOrders?.reverse()
                .slice(0, 5)
                .map((order) => {
                  return (
                    <tr key={order?._id}>
                      <td>
                        {order?.cartItems?.map((item) => {
                          return (
                            <div className="flex flex-col gap-2" key={item._id}>
                              <div className="flex items-center space-x-3">
                                <div className="avatar">
                                  <div className="rounded-full w-12 h-12">
                                    <img
                                      src={item?.product?.images[0]?.image}
                                      alt="Avatar Tailwind CSS Component"
                                      className="object-cover object-center"
                                    />
                                  </div>
                                </div>
                                <div className="font-bold capitalize line-clamp-2">
                                  {item?.product?.title}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </td>
                      <td>{order?.paymentMethod}</td>
                      <td>{order?.createdAt}</td>
                      <td>{order?.totalOrderPrice}</td>
                      <td>
                        <div
                          className={`p-1 rounded font-semibold ${
                            order?.orderStatus === "accepted"
                              ? "bg-green-100 text-green-500"
                              : order?.orderStatus === "pending"
                              ? "bg-yellow-100 text-yellow-500"
                              : "bg-red-100 text-red-500"
                          }`}
                        >
                          {order?.orderStatus}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Home;
