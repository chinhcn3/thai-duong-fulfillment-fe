import React, { ReactElement, ReactNode } from "react";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import theme from "../theme/themeConfig";
import { NextPage } from "next";
import locale from "antd/locale/vi_VN";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <main>
      <ConfigProvider theme={theme} locale={locale}>
        {getLayout(<Component {...pageProps} />)}
      </ConfigProvider>
    </main>
  );
};

export default App;
