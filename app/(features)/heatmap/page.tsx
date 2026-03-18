import dynamicImport from 'next/dynamic'
import Loading from './loading'

const PageClient = dynamicImport(() => import('./page.client'), { loading: () => <Loading /> })

export default function HeatmapPage() {
  return <PageClient />
}
