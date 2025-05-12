import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import { Layout } from '~/components/layout/app'
import 'virtual:uno.css'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob<any>('../pages/**/*.tsx', { eager: true })
      let page = pages[`../pages/${name}.tsx`]

      const Page = page.default
      const WrappedPage = (props: any) => (
        <Layout>
          <Page {...props} />
        </Layout>
      )

      return { default: WrappedPage }
    },
    setup: ({ App, props }) => <App {...props} />,
  })
}
