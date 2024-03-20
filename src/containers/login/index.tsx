import { Button, Input, Space, Typography } from 'antd/lib'
import Router from 'next/router'
import styled from 'styled-components'

export function LoginContainer() {
  return (
    <LoginWrapper>
      <Space direction="vertical" align="center" style={{ height: '100%' }}>
        <InputWrapper placeholder="User name..." />
        <InputWrapper placeholder="Password..." />
        <Button type="primary" onClick={() => Router.push('/')}>
          Login
        </Button>
      </Space>
    </LoginWrapper>
  )
}

const InputWrapper = styled(Input)`
  width: 256px;
`
const LoginWrapper = styled.div`
  margin: auto;
`
