import React from "react";
import { Skeleton } from "antd";
import millify from "millify";
import {
  DollarCircleOutlined,
  DotChartOutlined,
  LineChartOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { useGetCryptosQuery } from "../src/services/cryptoApi";
import CryptoCurrencies from './cryptocurrencies'

export default function Home() {
  const { data, isFetching } = useGetCryptosQuery(10);

  if (isFetching) return <Skeleton />;
  const { stats } = data.data;

  return (
    <>
      <div className="flex flex-col gap-y-16">
        <div>
          <h1 className="text-2xl md:text-4xl font-semibold mb-5">
            Global Crypto Statistics
          </h1>
          <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-3">
            <div className="shadow-xl p-5 flex flex-col gap-y-1 items-center rounded-2xl transition-shadow duration-300 hover:shadow-2xl">
              <LineChartOutlined className="text-2xl text-red-600  mb-3" />
              <h2 className="font-medium">Total Cryptocurrencies</h2>
              <p className="text-2xl font-semibold">
                {stats.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            </div>
            <div className="shadow-xl p-5 flex flex-col gap-y-1 items-center rounded-2xl transition-shadow duration-300 hover:shadow-2xl">
              <MoneyCollectOutlined className="text-2xl text-green-600  mb-3" />
              <h2 className="font-medium">Total Exchanges</h2>
              <p className="text-2xl font-semibold">
                {millify(stats.totalExchanges)}
              </p>
            </div>
            <div className="shadow-xl p-5 flex flex-col gap-y-1 items-center rounded-2xl transition-shadow duration-300 hover:shadow-2xl">
              <DollarCircleOutlined className="text-2xl text-blue-600  mb-3" />
              <h2 className="font-medium">Total Market Cap</h2>
              <p className="text-2xl font-semibold">
                {millify(stats.totalMarketCap)}
              </p>
            </div>
            <div className="shadow-xl p-5 flex flex-col gap-y-1 items-center rounded-2xl transition-shadow duration-300 hover:shadow-2xl">
              <DotChartOutlined className="text-2xl text-yellow-600  mb-3" />
              <h2 className="font-medium">Total 24h Volume</h2>
              <p className="text-2xl font-semibold">
                {millify(stats.total24hVolume)}
              </p>
            </div>
            <div className="shadow-xl p-5 flex flex-col gap-y-1 items-center rounded-2xl transition-shadow duration-300 hover:shadow-2xl">
              <DollarCircleOutlined className="text-2xl text-purple-600  mb-3" />
              <h2 className="font-medium">Total Markets</h2>
              <p className="text-2xl font-semibold">
                {millify(stats.totalMarkets)}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl md:text-4xl font-semibold">
            Top 10 Cryptocurrencies in the world
          </h1>
          <CryptoCurrencies simplified />
        </div>
      </div>
    </>
  );
}
