import { registry } from '~registry'
import { createTuyau } from '@tuyau/core/client'
import { QueryClient } from '@tanstack/react-query'
import { createTuyauReactQueryClient } from '@tuyau/react-query'

export const queryClient = new QueryClient()

export const client = createTuyau({
	baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3333',
	registry,
	credentials: 'include',
})
export const api = createTuyauReactQueryClient({ client })
