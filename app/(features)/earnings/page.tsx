import dynamicImport from 'next/dynamic'
import Loading from './loading'

export const dynamic = 'force-dynamic'

const PageClient = dynamicImport(() => import('./page.client'), { loading: () => <Loading /> })

export default function EarningsPage() {
  return <PageClient />
}
