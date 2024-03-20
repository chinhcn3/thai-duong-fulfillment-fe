import { DownOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
import Link from 'antd/lib/typography/Link'
import React from 'react'

import { setGlobalState, useGlobalState } from '../../../common/hooks'

const items: MenuProps['items'] = [
  {
    label: 'Tiếng Việt',
    key: 'vn',
  },
  {
    label: 'English',
    key: 'en',
  },
]

export function ChooseLanguage() {
  const [lang] = useGlobalState('lang') as any

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setGlobalState({ lang: e.key })
  }

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={['click']}>
      <Link onClick={(e) => e.preventDefault()}>
        <Space>
          Language: {lang || 'vn'}
          <DownOutlined />
        </Space>
      </Link>
    </Dropdown>
  )
}
