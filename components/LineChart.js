import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimeStamp = [];

  for (let x = 0; x < coinHistory?.data?.history?.length; x++) {
    coinPrice.push(coinHistory.data.history[x].price);
    coinTimeStamp.push(
      new Date(coinHistory.data.history[x].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <div className="flex md:items-center flex-col md:flex-row gap-4 md:justify-between mb-4 mt-4">
        <div className="flex gap-x-2">
          <span className="text-xl md:text-3xl">USD</span>
          <p className="text-4xl md:text-6xl font-medium">{currentPrice}</p>
        </div>
        <div className="hidden md:flex md:items-center md:justify-center md:flex-row gap-3 font-bold">
          <p>{coinHistory?.data?.change}</p>
          <p>
            {coinName} Price: $ {currentPrice}
          </p>
        </div>
      </div>

      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
