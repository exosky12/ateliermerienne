import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import '../css/app.css'
import 'uno.css'
import { InertiaPage } from './app'
import { Layout } from '~/components/layout/app'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob<{ default: InertiaPage }>('../pages/**/*.tsx', { eager: true })
      const page = pages[`../pages/${name}.tsx`]
      page.default.layout = page.default.layout || ((page: any) => <Layout children={page} />)
      return page
    },
    setup: ({ App, props }) => <App {...props} />,
  })
}
