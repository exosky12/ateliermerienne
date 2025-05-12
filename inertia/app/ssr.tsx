import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import { Layout } from '~/components/layout/app'
import type { ReactNode } from 'react'
import 'virtual:uno.css'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob<any>('../pages/**/*.tsx', { eager: true })
      let page = pages[`../pages/${name}.tsx`]

      page.default.layout || ((children: ReactNode) => <Layout>{children}</Layout>)

      return page
    },
    setup: ({ App, props }) => <App {...props} />,
  })
}
