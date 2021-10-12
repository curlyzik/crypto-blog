import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useRouter } from "next/router";
import millify from "millify";
import { Col, Row, Typography, Select, Skeleton } from "antd";
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
      <Row className="flex items-center justify-center border-b-2 pb-5 mb-5">
        <Col className="flex flex-col justify-center items-center  gap-3">
          <div className="text-lg md:text-3xl uppercase font-bold">
            {cryptoDetails.name}{" "}
            <span className="lowercase">({cryptoDetails.slug})</span> Price
          </div>
          <p>
            {cryptoDetails.name} live price in US dollars. View value
            statistics, market cap and supply
          </p>
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
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
        <Col lg={24}>
          <LineChart
            coinHistory={coinHistory}
            currentPrice={millify(cryptoDetails.price)}
            coinName={cryptoDetails.name}
          />
        </Col>
      </Row>

      <Row className="">
          <Col className="">
            <Title level={3} className="">
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>Overview showing the stats of {cryptoDetails.name}</p>
          </Col>
          {stats.map(({ title, value, icon }) => (
            <Col className="">
              <Text>{icon}</Text>
              <Text>{title}</Text>

              <Text className="">{value}</Text>
            </Col>
          ))}


        <Col className="">
          <Col className="">
            <Title level={3} className="">
              Other Statistics
            </Title>
            <p>Overview showing the stats of all cryptocurrencies</p>
          </Col>
          {genericStats.map(({ title, value, icon }) => (
            <Col className="">
              <Text>{icon}</Text>
              <Text>{title}</Text>
              <Text className="">{value}</Text>
            </Col>
          ))}
        </Col>
      </Row>

      <Row className="">
        <Col className="">
          <Title level={3} className="">
            What is {cryptoDetails.name}
            {HTMLReactParser(cryptoDetails.description)}
          </Title>
        </Col>
        <Col className="">
          <Title level={3} className="">
            {cryptoDetails.name} Link
          </Title>
          {cryptoDetails.links.map((link) => (
            <Col className="" key={link.name}>
              <Title className="" level={5}>
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Col>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default Cryptocurrency;
