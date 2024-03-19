import { PropsWithChildren } from 'react'
import styled from 'styled-components'

import LeftMenu from './left-menu'

export function AppLayout({ children }: PropsWithChildren<any>) {
  return (
    <div>
      <div>Header layout</div>
      <LayoutWrapper>
        <LeftMenu />
        <PageContainer>{children} </PageContainer>
      </LayoutWrapper>
    </div>
  )
}

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px;
`
