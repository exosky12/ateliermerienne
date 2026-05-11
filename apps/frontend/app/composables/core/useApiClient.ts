import { createTuyau } from '@tuyau/core/client'
import { createTuyauVueQueryClient } from '@tuyau/vue-query'
import { registry } from '@ateliermerienne/backend/registry'

export function useTuyauClient() {
  const config = useRuntimeConfig()
  const headers: Record<string, string> = {}

  if (import.meta.server) {
    Object.assign(headers, useRequestHeaders(['referer', 'cookie']))
  }

  return createTuyau({
    baseUrl: String(config.public.apiUrl),
    registry,
    credentials: 'include',
    headers,
  })
}

export function useApi() {
  return createTuyauVueQueryClient({
    client: useTuyauClient(),
  })
}

export function useUrlFor() {
  return useTuyauClient().urlFor
}
