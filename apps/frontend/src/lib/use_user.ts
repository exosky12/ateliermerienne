import { useSuspenseQuery } from '@tanstack/react-query'

import { authQueries } from '@/lib/queries.ts'

export const useUserSuspense = () => {
	return useSuspenseQuery(authQueries.getUser())
}
