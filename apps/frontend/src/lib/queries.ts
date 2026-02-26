import { api } from '@/lib/tuyau'

export const authQueries = {
	getUser: () =>
		api.getUser.execute.queryOptions(
			{},
			{
				staleTime: 0,
				gcTime: Infinity,
				retry: false,
			}
		),
}
