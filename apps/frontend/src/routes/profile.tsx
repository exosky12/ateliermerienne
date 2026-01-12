import { tuyau } from '@/config/tuyau'
import { Form } from '@packages/design-system/form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
	component: RouteComponent,
})

function RouteComponent() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: async () => {
			return await tuyau.logout.$post()
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['isConnected'] })
			await navigate({ to: '/' })
		},
	})

	return (
		<Form
			onSubmit={(e) => {
				e.preventDefault()
				mutation.mutate()
			}}
			buttonLabel="Déconnexion"
		/>
	)
}
