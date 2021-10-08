import React, { useEffect, useState } from "react";
import millify from "millify";
import { Card, Row, Col, Input, Skeleton } from "antd";
import Link from "next/link";
import { useGetCryptosQuery } from "../src/services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  if (isFetching) return <Skeleton />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Crypto"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="mt-8">
      
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} key={currency.id}>
            <Link href={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    src={currency.iconUrl}
                    className="w-16"
                    alt={currency.name}
                  />
                }
                className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer duration-500 rounded-2xl"
              >
                <div>
                  <p>
                    <span className="font-bold">Price:</span> {millify(currency.price)}
                  </p>
                  <p>
                    <span className="font-bold">Market Cap:</span> {millify(currency.marketCap)}
                  </p>
                  <p>
                    <span className="font-bold">Daily Change:</span> {millify(currency.change)}%
                  </p>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
