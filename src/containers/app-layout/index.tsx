import { PropsWithChildren } from 'react'
import styled from 'styled-components'

import LeftMenu from './left-menu'

export function AppLayout({ children }: PropsWithChildren<any>) {
  return (
    <div>
      <Header>Thai Duong Fulfillment</Header>
      <LayoutWrapper>
        <LeftMenu />
        <PageContainer>{children} </PageContainer>
      </LayoutWrapper>
    </div>
  )
}

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
  height: 100%;
  overflow: auto;
  padding-top: 40px;
`

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px;
  overflow: auto;
`
