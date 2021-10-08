import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card, Skeleton } from "antd";
import { useGetCryptosQuery } from "../src/services/cryptoApi";
import { useGetCryptoNewsQuery } from "../src/services/cryptoNewsApi";
import moment from "moment";

const { Text, Title } = Typography;
const { Option } = Select;
const { Meta } = Card;

const demoImage =
  "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 6 : 12,
  });

  const { data } = useGetCryptosQuery(100);
  if (!cryptoNews?.value) return <Skeleton />;

  console.log(cryptoNews.value);

  return (
    <>
      {!simplified && (
        <Row>
          <Col span={24}>
            <Select
              showSearch
              className="md:w-full"
              dropdownClassName="border-0 ring-inset ring-blue-500 p-4"
              placeholder="Select a cryptocurrency"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Cryptocurrency">Cryptocurrencies</Option>
              {data?.data?.coins.map((coin) => (
                <Option value={coin.name}>{coin.name}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      )}

      <Row gutter={[24, 24]} className="mt-6">
        {cryptoNews?.value?.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i} className="grid items-stretch">
            <Card className="border-0 shadow-lg hover:shadow-xl transition duration-300 rounded-2xl">
              <a
                href={news.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-black"
              >
                <p className="text-lg font-bold mb-4">{news.name}</p>
                <p className="text-gray-500 mb-4">
                  {news.description.substring(0, 150)}...
                </p>
                <div className="text-gray-500 gap-2 flex justify-between items-center">
                  <div className="flex gap-1 items-center">
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt={news}
                    />
                    <Text className="">{news.provider[0]?.name}</Text>
                  </div>
                  <Text>
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
