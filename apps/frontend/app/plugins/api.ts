import { createTuyau } from '@tuyau/core/client'
import { createTuyauVueQueryClient } from '@tuyau/vue-query'
import { registry } from '@ateliermerienne/backend/registry'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const client = createTuyau({
    baseUrl: config.public.apiUrl || 'http://localhost:3333',
    registry,
  })

  const tuyau = createTuyauVueQueryClient({ client })

  return {
    provide: {
      api: client,
      tuyau,
    },
  }
})
