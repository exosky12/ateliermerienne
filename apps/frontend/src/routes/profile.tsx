import { Form } from '@packages/design-system/form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { tuyau } from '@/lib/tuyau.ts'

export const Route = createFileRoute('/profile')({
	component: RouteComponent,
})

function RouteComponent() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: async () => {
			return tuyau.sign_out.$post()
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['user'] })
			await navigate({ to: '/' })
		},
	})

	return (
		<>
			<Form
				onSubmit={(e) => {
					e.preventDefault()
					mutation.mutate()
				}}
				buttonLabel="Déconnexion"
			/>
			<h2>{}</h2>
		</>
	)
}
