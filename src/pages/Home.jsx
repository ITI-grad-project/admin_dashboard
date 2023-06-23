import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
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
  return (
    <>
      <div>
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
        style={{ width: "600px", height: "400px" }}
        className="mt-10 border shadow p-7 "
      >
        <h2 className="mb-10 text-primary">Shopping Status</h2>
        <Line data={data} options={options}></Line>
      </div>
      ////
    </>
  );
}
export default Home;
