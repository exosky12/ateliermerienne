import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import { AppLayout } from '~/layouts/AppLayout'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
      const resolvedPaged = pages[`../pages/${name}.tsx`]

      resolvedPaged.default.layout = resolvedPaged.default.layout || AppLayout

      return resolvedPaged
    },
    setup: ({ App, props }) => <App {...props} />,
  })
}
