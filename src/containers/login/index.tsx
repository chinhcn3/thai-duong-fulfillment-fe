import { Button, Input, Space } from 'antd/lib'
import Router from 'next/router'
import styled from 'styled-components'

import { LANG_KEY, setGlobalState, useGlobalState, useLocaleMessages } from '../../common/hooks'
import { locale } from './locale'

export function LoginContainer() {
  const messages = useLocaleMessages(locale)
  const [lang] = useGlobalState<SharedTypes.LanguageType>(LANG_KEY)
  console.log('lang', lang)
  return (
    <LoginWrapper>
      <Space direction="vertical" align="center" style={{ height: '100%' }}>
        <InputWrapper placeholder={messages.place_holder_user_name} />
        <InputWrapper placeholder={messages.place_holder_password} />
        <Button type="primary" onClick={() => Router.push('/')}>
          {messages.login}
        </Button>
        <Button onClick={() => setGlobalState({ lang: lang === 'vn' ? 'en' : 'vn' })}>Change language</Button>
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
