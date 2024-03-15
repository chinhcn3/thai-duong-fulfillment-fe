import {
  NavLeftMenu,
  StyleCollapse,
  StyledNavLeft,
} from "@/containers/layout/styles";
import React from "react";
import type { MenuProps } from "antd/es/menu";
import ColseIcon from "@/assets/images/icons/close.svg";
import HomeIcon from "@/assets/images/icons/home.svg";
import ContractIcon from "@/assets/images/icons/contract.svg";
import CalendarIcon from "@/assets/images/icons/calendar.svg";
import HeartIcon from "@/assets/images/icons/heart.svg";
import ContactIcon from "@/assets/images/icons/contact.svg";
import { useRouter } from "next/router";
import { roleHelper } from "@/security/router-guard/role-helper";
import { authUserInfoStore } from "@/stores/auth/auth-store";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const NavLeft = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const router = useRouter();
  const role = roleHelper();
  const userInfo = authUserInfoStore.useSlice((state) => state.data);
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const onClick: MenuProps["onClick"] = (e) => {
    router.push(e.key);
  };
  const items: MenuItem[] = [
    getItem(
      collapsed ? "" : <div style={{ marginLeft: 2 }}>Trang chủ</div>,
      "/",
      <HomeIcon />
    ),
    getItem(
      collapsed ? "" : <div style={{ marginLeft: 2 }}>Hợp đồng</div>,
      "/contracts",
      <ContractIcon />
    ),
  ];
  return (
    <StyledNavLeft width={236} collapsed={collapsed}>
      <StyleCollapse>
        <ColseIcon
          onClick={toggleCollapse}
          src="/icons/close.svg"
          width={24}
          height={24}
          alt="collapse"
        />
        {
          <div className={collapsed ? "title" : "title collapse"}>
            {!collapsed &&
              userInfo?.user_store &&
              userInfo?.user_store?.length > 0 &&
              userInfo?.user_store[0]?.store?.name}
          </div>
        }
      </StyleCollapse>
      <NavLeftMenu
        className={collapsed ? "collapsed-menu" : ""}
        collapse={collapsed.toString()}
        onClick={onClick}
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ borderRight: 0 }}
        items={items}
      />
    </StyledNavLeft>
  );
};
