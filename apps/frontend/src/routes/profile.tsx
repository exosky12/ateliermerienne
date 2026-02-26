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
	const { data: user } = useUserSuspense()

	const mutation = useMutation(
		api.signOut.execute.mutationOptions({
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ['user'] })
				await navigate({ to: '/' })
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
			<h2>{user?.fullName}</h2>
		</>
	)
}
