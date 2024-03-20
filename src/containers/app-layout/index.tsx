import { PropsWithChildren } from 'react'
import styled from 'styled-components'

import LeftMenu from './left-menu'

export type LayoutProps = {
  showMenu?: boolean
}

export function AppLayout({ showMenu, children }: PropsWithChildren<LayoutProps>) {
  return (
    <PageContainer>
      <Header>Thai Duong Fulfillment</Header>
      <LayoutWrapper>
        {showMenu && <LeftMenu />}
        <PageContent>{children} </PageContent>
      </LayoutWrapper>
    </PageContainer>
  )
}

const PageContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  overflow-y: unset;
  height: 100vh;
`

const Header = styled.div`
  position: fixed;
  width: 100vw;
  display: flex;
  justify-items: center;
  background-color: green;
  height: 40px;
  color: white;
  align-items: center;
  padding: 0 16px;
  z-index: 999;
`

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow: auto;
  margin-top: 40px;
  height: calc(100vh - 40px);
`

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px;
  overflow: auto;
`
