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
      <Row className="flex items-center flex-col md:flex-row gap-4 md:justify-between mb-4">
        <h2 className='text-3xl font-semibold'>
          {coinName} Price chart
        </h2>
        <Col className="flex md:items-center md:justify-center flex-col md:flex-row gap-3 font-bold">
          <p>{coinHistory?.data?.change}</p>
          <p>
            {coinName} Price: $ {currentPrice}
          </p>
        </Col>
      </Row>

      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
