import { ReactElement } from 'react'

import { AppLayout } from '../container/app-layout'
import { DashBoard } from '../container/dash-board'

export default function Page() {
  return (
    <AppLayout>
      <DashBoard />
    </AppLayout>
  )
}
