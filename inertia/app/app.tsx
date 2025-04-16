/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'

import { Layout } from '~/components/layout/app'
import type { ComponentType } from 'react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

const appName = import.meta.env.VITE_APP_NAME || 'Atelier Merienne'

void createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => (title ? `${title} - ${appName}` : appName),

  resolve: async (name) => {
    const page = (await resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob('../pages/**/*.tsx')
    )) as { default: ComponentType<any> }

    const Page = page.default
    const WrappedPage = (props: any) => (
      <Layout>
        <Page {...props} />
      </Layout>
    )

    return { default: WrappedPage }
  },

  setup({ el, App, props }) {
    hydrateRoot(el, <App {...props} />)
  },
})
