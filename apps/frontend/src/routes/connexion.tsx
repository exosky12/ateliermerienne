import { Field } from '@packages/design-system/field'
import { useQueryClient } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'

import { tuyau } from '@/config/tuyau'
import { DynamicForm } from '@/components/DynamicForm'

export const Route = createFileRoute('/connexion')({
	component: RouteComponent,
})

function RouteComponent() {
	const queryClient = useQueryClient()

	return (
		<DynamicForm
			defaultValues={{
				email: '',
				password: '',
			}}
			mutationFn={async (value) => {
				const { data, response } = await tuyau.connexion.$post(value)
				console.log(response)
				return { data }
			}}
			onSuccess={async (data) => {
				console.log('Success:', data)
				await queryClient.invalidateQueries({ queryKey: ['isConnected'] })
			}}
			buttonLabel="Se connecter"
		>
			{(form) => (
				<>
					<form.Field
						name="email"
						children={(field: any) => (
							<Field
								type="email"
								label="Email"
								placeholder="Entrez votre email"
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								errorMessage={field.state.meta.errors.join(', ')}
							/>
						)}
					/>
					<form.Field
						name="password"
						children={(field: any) => (
							<Field
								type="password"
								label="Mot de passe"
								placeholder="Entrez votre mot de passe"
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								errorMessage={field.state.meta.errors.join(', ')}
							/>
						)}
					/>
					<span>
						Vous n'avez pas encore de compte ?{' '}
						<Link className="underline" to="/inscription">
							Inscrivez-vous
						</Link>
					</span>
				</>
			)}
		</DynamicForm>
	)
}
