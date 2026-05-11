import {createTuyau} from '@tuyau/core/client'
import {QueryClient} from '@tanstack/react-query'
import {createTuyauReactQueryClient} from '@tuyau/react-query'
import type {Tuyau} from '@tuyau/core/client'
import type {SchemaEndpoint} from '@tuyau/core/types'
import type {TuyauReactQuery} from '@tuyau/react-query'
import {registry} from '@ateliermerienne/backend/registry'

export const queryClient = new QueryClient()

const env = (import.meta as ImportMeta & {env: Record<string, string | undefined>}).env
const baseUrl = env.VITE_API_URL

if (!baseUrl) {
  throw new Error('Missing VITE_API_URL environment variable')
}

export const client: Tuyau<any> = createTuyau({baseUrl, registry})
export const api: TuyauReactQuery<Record<string, SchemaEndpoint>> = createTuyauReactQueryClient({client})
