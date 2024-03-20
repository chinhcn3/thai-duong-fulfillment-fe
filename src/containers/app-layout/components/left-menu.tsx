import { DashboardOutlined, PayCircleOutlined, SettingOutlined, TagOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import Router from 'next/router'
import React from 'react'
import styled from 'styled-components'

import { useLocaleMessages } from '../../../common/hooks'
import { locale } from '../locale'

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

export function LeftMenu() {
  const messages = useLocaleMessages(locale)
  const onClick: MenuProps['onClick'] = (e) => {
    Router.push(`/${e.key}`)
  }

  const items: MenuProps['items'] = [
    getItem(messages.dash_board, '', <DashboardOutlined />),
    getItem(messages.order, 'order', <TagOutlined />),
    getItem(messages.warehouse, 'warehouse', <TagOutlined />),
    getItem(messages.order_control, 'order_control', <TagOutlined />),
    getItem(messages.cash_flow, 'cash_flow', <PayCircleOutlined />),
    getItem(messages.for_control, 'for_control', <TagOutlined />),
    getItem(messages.chart, 'chart', <TagOutlined />),
    getItem(messages.report, 'report', <SettingOutlined />, [
      getItem(messages.delivery_report, 'delivery_report'),
      getItem(messages.compare_revenue_services, 'compare_revenue_services'),
      getItem(messages.sales_support_report, 'sales_support_report'),
      getItem(messages.accountant_report, 'accountant_report'),
      getItem(messages.report_receiving_cod_daily, 'report_receiving_cod_daily'),
      getItem(messages.order_not_received_cod_refund, 'order_not_received_cod_refund'),
    ]),

    getItem(messages.setting, 'setting', <SettingOutlined />, [
      getItem(messages.user, 'user'),
      getItem(messages.exchange, 'exchange'),
      getItem(messages.debt, 'debt'),
    ]),
  ]

  return (
    <MenuWrapper
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['dashboard']}
      defaultOpenKeys={['setting']}
      theme="dark"
      mode="inline"
      items={items}
    />
  )
}

const MenuWrapper = styled(Menu)`
  height: 100%;
  overflow-y: auto;
`
