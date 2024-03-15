import { NavLeft } from "@/containers/layout/nav-left";
import styled from "styled-components";
import { Layout, Menu } from "antd";

const { Sider, Header } = Layout;
export const StyledNavLeft = styled(Sider)`
  background: #fff !important;
  box-shadow: 5px 0px 4px 0px #fff9f9;
`;

export const HeaderStyles = styled(Header)`
  height: 60px !important;
  background: rgba(255, 255, 255, 0.1) !important;
  border-bottom: 1px solid #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 25px !important;
`;

export const StyleCollapse = styled.div`
  display: flex;
  height: 84px;
  padding: 20px;
  .title {
    color: #27221e;
    font-size: 22px;
    font-family: "Oleo Script", system-ui;

    font-weight: 700;
  }

  .collapse {
    opacity: 0;

    animation: fadeIn 0.2s;
    animation-delay: 0.2s;
    animation-fill-mode: forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const NavLeftMenu = styled(Menu)<{ collapse?: string }>`
  .ant-menu-item {
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-inline: ${(props) =>
      props.collapse === "true" ? "unset !important" : ""};

    text-align: ${(props) => (props.collapse === "true" ? "center" : "left")};
  }
`;
