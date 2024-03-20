import { PropsWithChildren } from 'react'
import styled from 'styled-components'

import { ChooseLanguage } from './components/choose-language'
import { LeftMenu } from './components/left-menu'

export type LayoutProps = {
  showMenu?: boolean
}

export function AppLayout({ showMenu, children }: PropsWithChildren<LayoutProps>) {
  return (
    <PageContainer>
      <Header>
        <Logo>Thai Duong Fulfillment</Logo>
        <ChooseLanguage />
      </Header>
      <LayoutWrapper>
        {showMenu && <LeftMenu />}
        <PageContent>{children} </PageContent>
      </LayoutWrapper>
    </PageContainer>
  )
}

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: lightseagreen;
`

const PageContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  overflow-y: unset;
  height: 100vh;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100vw;
  justify-items: center;
  border-bottom: 1px solid #e8e8e8;
  height: 50px;
  align-items: center;
  padding: 0 24px;
  z-index: 999;
`

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow: auto;
  height: 100%;
`

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px;
  overflow: auto;
`
