import { AppLayout } from '../containers/app-layout'
import { OrderContainer } from '../containers/order'

export default function Page() {
  return (
    <AppLayout>
      <OrderContainer />
    </AppLayout>
  )
}
