import { queryOptions } from '@tanstack/react-query'

import { tuyau } from '@/lib/tuyau'

export const authQueries = {
	getUser: () =>
		queryOptions({
			queryKey: ['user'],
			queryFn: async () => {
				const res = await tuyau.get_user.$get()
				return res.data ?? null
			},
			staleTime: 0,
			gcTime: Infinity,
			retry: false,
		}),
}
