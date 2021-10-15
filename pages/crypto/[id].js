import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useRouter } from "next/router";
import millify from "millify";
import { Col, Row, Typography, Select, Skeleton, Space } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../../src/services/cryptoApi";
import LineChart from "../../components/LineChart";

const { Title, Text } = Typography;
const { Option } = Select;

const Cryptocurrency = () => {
  const router = useRouter();
  const { id: coinId } = router.query;
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Skeleton />;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails.approvedSupply ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails.totalSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <div>
      <div className="flex items-center md:justify-center pb-5 mb-5">
        <div className="flex flex-col md:justify-center md:items-center gap-3">
          <div className="flex md:flex-row md:items-center gap-x-3">
            <img
              src={cryptoDetails.iconUrl}
              alt={cryptoDetails.name}
              className="w-10"
            />
            <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-x-2">
              <h1 className="text-3xl md:text-4xl uppercase font-bold">
                {cryptoDetails.name}
              </h1>
              <span className="lowercase text-gray-500">
                ({cryptoDetails.slug})
              </span>
            </div>
          </div>
          <p className="hidden md:block">
            {cryptoDetails.name} live price in US dollars. View value
            statistics, market cap and supply
          </p>
        </div>
      </div>

      <div className="md:border md:p-6 mb-9">
        <Row>
          <Col xs={24} lg={6}>
            <Select
              defaultValue="7d"
              className="w-full mb-4"
              placeholder="Select Time Period"
              onChange={(value) => setTimePeriod(value)}
            >
              {time.map((date) => (
                <Option key={date}>{date}</Option>
              ))}
            </Select>
          </Col>
        </Row>

        <Row>
          <Col xs={24} lg={24}>
            <LineChart
              coinHistory={coinHistory}
              currentPrice={millify(cryptoDetails.price)}
              coinName={cryptoDetails.name}
            />
          </Col>
        </Row>

        <div className="mt-6 flex flex-col gap-y-10">
          <div>
            <h1 className="text-lg font-extrabold md:font-bold">
              Market Stats
            </h1>
            <div className="grid md:grid-cols-6 gap-y-6 items-center mt-4">
              {stats.map(({ title, value, icon }) => (
                <div key={title} className="grid grid-cols-[auto,1fr] md:grid-cols-2 md:flex md:flex-col md:justify-center gap-x-4 gap-y-2">
                  <div>
                    <h3 className="text-lg font-normal md:text-gray-500 md:text-sm md:font-bold">
                      {title}
                    </h3>
                  </div>
                  <p className="justify-self-end text-lg text-black font-medium">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-lg font-extrabold md:font-bold">Other Stats</h1>
            <div className="grid md:grid-cols-6 gap-y-6 items-center mt-4">
              {genericStats.map(({ title, value, icon }) => (
                <div key={title} className="grid grid-cols-[auto,1fr] md:grid-cols-2 md:flex md:flex-col md:justify-center gap-x-4 gap-y-2">
                  <div>
                    <h3 className="text-lg font-normal md:text-gray-500 md:text-sm md:font-bold">
                      {title}
                    </h3>
                  </div>
                  <p className="justify-self-end text-lg text-black font-medium">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-x-5 items-start">
        <div className="md:border md:p-6">
          <h3 className="text-2xl font-bold">What is {cryptoDetails.name}</h3>
          {HTMLReactParser(cryptoDetails.description)}
        </div>
        <div className="mt-8 md:border md:p-6">
          <h3 className="text-2xl mb-4">{cryptoDetails.name} Links</h3>
          {cryptoDetails.links.map((link) => (
            <div key={link.name} className="grid grid-cols-2 gap-x-5">
              <p className="text-lg font-medium mb-5">{link.type}</p>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className=" text-gray-500 hover:text-black"
              >
                <span className="hover:border-b hover:border-black transition-all duration-300">
                  {link.name}
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cryptocurrency;
