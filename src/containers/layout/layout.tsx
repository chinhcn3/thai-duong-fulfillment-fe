import { Layout } from "antd";
import { NavLeft } from "@/containers/layout/nav-left";
import { HeaderItem } from "@/containers/layout/header";
import { useEffect } from "react";
import { authUserInfoStore } from "@/stores/auth/auth-store";
const { Content } = Layout;
export const LayoutItem = ({ children }: React.PropsWithChildren<{}>) => {
  useEffect(() => {
    authUserInfoStore.onFilterChange();
  }, []);
  return (
    <Layout
      style={{
        minHeight: "100vh",
        fontFamily: "SVN-Poppins !important",
      }}
    >
      <Layout>
        <NavLeft />
        <Layout
          style={{
            background:
              "linear-gradient(124deg, rgb(236, 255, 253) 15.18%, rgb(206 227 243) 100%)",
          }}
        >
          <HeaderItem />

          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              borderRadius: 8,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
