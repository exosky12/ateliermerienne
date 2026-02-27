import { Form } from '@packages/design-system/form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { api } from '@/lib/tuyau.ts'
import { useUserSuspense } from '@/lib/use_user.ts'

export const Route = createFileRoute('/profile')({
	component: RouteComponent,
})

function RouteComponent() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const { data } = useUserSuspense()

	const mutation = useMutation(
		api.signOut.execute.mutationOptions({
			onSuccess: async () => {
				queryClient.setQueryData(['user'], null)

				// 2. On redirige AVANT d'invalider pour que l'utilisateur quitte la page protégée
				await navigate({ to: '/' })

				// 3. On invalide tout le reste en arrière-plan
				await queryClient.invalidateQueries()
			},
		})
	)

	return (
		<>
			<Form
				onSubmit={(e) => {
					e.preventDefault()
					mutation.mutate({})
				}}
				buttonLabel="Déconnexion"
			/>
			<h2>{data.user?.fullName}</h2>
		</>
	)
}
