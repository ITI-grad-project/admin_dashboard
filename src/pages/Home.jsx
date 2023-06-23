import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
// import { ResponsivePie } from "@nivo/pie";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
function Home() {
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

  return (
    <>
      <div style={{ width: "500px", height: "5000px" }}>
        <Line data={data} options={options}></Line>
      </div>
    </>
  );
}
export default Home;
