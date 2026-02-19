import { createTuyau } from '@tuyau/client'
import { superjson } from '@tuyau/superjson/plugin'
import type { ApiDefinition } from '@apps/server/api'
// import { createTuyauReactQueryClient } from '@tuyau/react-query'

export const tuyau = createTuyau<{ definition: ApiDefinition }>({
	baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3333',
	credentials: 'include',
	plugins: [superjson()],
})

// export const query = createTuyauReactQueryClient({ client: tuyau })
