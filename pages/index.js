import React from "react";
import { Skeleton } from "antd";
import millify from "millify";
import Link from "next/link";
import {
  DollarCircleOutlined,
  DotChartOutlined,
  LineChartOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { useGetCryptosQuery } from "../src/services/cryptoApi";
import News from "../components/News";
import Cryptos from "../components/Cryptos";

export default function Home() {
  const { data, isFetching } = useGetCryptosQuery(10);

  if (isFetching) return <Skeleton />;
  const { stats } = data.data;

  return (
    <>
      <div className="flex flex-col gap-y-20">
        <div>
          <h1 className="text-lg md:text-3xl uppercase font-bold mb-5">
            Global Crypto Statistics
          </h1>
          <div className="grid grid-col-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
            <div className="bg-white shadow-lg p-5 flex flex-col gap-y-1 items-center rounded-2xl transition-shadow duration-300 hover:shadow-xl">
              <LineChartOutlined className="text-2xl text-red-600  mb-3" />
              <h2 className="font-medium">Total Cryptocurrencies</h2>
              <p className="text-2xl font-semibold">
                {stats.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </p>
            </div>
            <div className="bg-white shadow-lg p-5 flex flex-col gap-y-1 items-center rounded-2xl transition-shadow duration-300 hover:shadow-xl">
              <MoneyCollectOutlined className="text-2xl text-green-600  mb-3" />
              <h2 className="font-medium">Total Exchanges</h2>
              <p className="text-2xl font-semibold">
                {millify(stats.totalExchanges)}
              </p>
            </div>
            <div className="bg-white shadow-lg p-5 flex flex-col gap-y-1 items-center rounded-2xl transition-shadow duration-300 hover:shadow-xl">
              <DollarCircleOutlined className="text-2xl text-blue-600  mb-3" />
              <h2 className="font-medium">Total Market Cap</h2>
              <p className="text-2xl font-semibold">
                {millify(stats.totalMarketCap)}
              </p>
            </div>
            <div className="bg-white shadow-lg p-5 flex flex-col gap-y-1 items-center rounded-2xl transition-shadow duration-300 hover:shadow-xl">
              <DotChartOutlined className="text-2xl text-yellow-600  mb-3" />
              <h2 className="font-medium">Total 24h Volume</h2>
              <p className="text-2xl font-semibold">
                {millify(stats.total24hVolume)}
              </p>
            </div>
            <div className="bg-white shadow-lg p-5 flex flex-col gap-y-1 items-center rounded-2xl transition-shadow duration-300 hover:shadow-xl">
              <DollarCircleOutlined className="text-2xl text-purple-600  mb-3" />
              <h2 className="font-medium">Total Markets</h2>
              <p className="text-2xl font-semibold">
                {millify(stats.totalMarkets)}
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="grid md:grid-cols-[auto,1fr] md:items-center gap-2">
            <h1 className="text-lg md:text-3xl uppercase font-bold">
              Top 10 Cryptocurrencies in the world
            </h1>
            <p className="md:justify-self-end text-base mr-4 font-semibold text-blue-500 md:border-b-2 border-blue-500">
              <Link href="/cryptocurrencies">
                <a>Load More</a>
              </Link>
            </p>
          </div>
          <Cryptos simplified />
        </div>
        <div>
          <div className="grid md:grid-cols-[auto,1fr] md:items-center gap-2">
            <h1 className="text-lg md:text-3xl uppercase font-bold">
              Latest Crypto News
            </h1>
            <p className="md:justify-self-end text-base mr-4 font-semibold text-blue-500 md:border-b-2 border-blue-500">
              <Link href="/news">
                <a>Load More</a>
              </Link>
            </p>
          </div>
          <News simplified />
        </div>
      </div>
    </>
  );
}
