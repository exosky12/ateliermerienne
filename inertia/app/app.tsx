/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { AppLayout } from '~/layouts/AppLayout'

const appName = import.meta.env.VITE_APP_NAME || 'Atelier Merienne'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => (title ? `${title} - ${appName}` : appName),

  resolve: async (name) => {
    const page = await resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob('../pages/**/*.tsx')
    ) as { default: React.ComponentType<any> }

    const Page = page.default
    const WrappedPage = (props: any) => (
      <AppLayout>
        <Page {...props} />
      </AppLayout>
    )

    return { default: WrappedPage }
  },

  setup({ el, App, props }) {
    hydrateRoot(el, <App {...props} />)
  },
})
