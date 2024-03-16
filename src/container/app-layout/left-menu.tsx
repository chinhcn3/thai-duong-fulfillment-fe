import { DashboardOutlined, PayCircleOutlined, SettingOutlined, TagOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import React from 'react'
import styled from 'styled-components'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const items: MenuProps['items'] = [
  getItem('Dashboard', 'dashboard', <DashboardOutlined />),
  getItem('Đơn hàng', 'don_hang', <TagOutlined />),
  getItem('Quản lý kho', 'warehouse',<TagOutlined />),
  getItem('ORDER CONTROL', 'order_control',<TagOutlined />),
  getItem('Dòng tiền', 'cash_flow', <PayCircleOutlined />),
  getItem('Đối soát', 'for_control',<TagOutlined />),
  getItem('Biểu đổ', 'chart',<TagOutlined />),
  getItem('Báo cáo', 'report', <SettingOutlined />, [
    getItem('Báo cáo giao hàng', 'transit'),
    getItem('Đối chiếu doanh thu, dịch vụ', 'control'),
    getItem('Báo cáo doanh số sale/ support', 'exchange'),
    getItem('Báo cáo kế toán', 'accountant_report'),
    getItem('Báo cáo nhận COD hàng ngày', 'cod_hang_ngay'),
    getItem('Danh sách đơn hàng chưa nhận được COD hoàn', 'cod_hoan'),
  ]),

  getItem('Settings', 'setting', <SettingOutlined />, [
    getItem('Người dùng', 'user'),
    getItem('Tỷ giá', 'exchange'),
    getItem('Nợ tồn', 'no_ton'),
  ]),
]

const App: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
  }

  return (
    <MenuWrapper
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['dashboard']}
      defaultOpenKeys={['setting']}
      mode="inline"
      items={items}
    />
  )
}

export default App

const MenuWrapper = styled(Menu)`
    height: 100vh;
    overflow-y: auto;
`
