import { ReactElement } from 'react'

import { AppLayout } from '../container/app-layout'
import { Login } from '../container/login'

export default function Page() {
  return <Login />
}

Page.getLayout = (page: ReactElement) => {
  return <AppLayout>{page}</AppLayout>
}
