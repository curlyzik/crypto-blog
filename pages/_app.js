import React, { useEffect } from "react";
import "antd/dist/antd.css";
import "tailwindcss/tailwind.css";
import { store } from "../src/app/store";
import { Provider } from "react-redux";
import Layout from "../components/Layout";
import '../style.css'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
