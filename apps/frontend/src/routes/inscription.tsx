import { tuyau } from '@/config/tuyau'
import { Field } from '@packages/design-system/field'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { DynamicForm } from '@/components/DynamicForm'

export const Route = createFileRoute('/inscription')({
	component: RouteComponent,
})

function RouteComponent() {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	return (
		<DynamicForm
			defaultValues={{
				email: '',
				password: '',
			}}
			mutationFn={async (value) => {
				const { data } = await tuyau.inscription.$post(value)
				return data
			}}
			onSuccess={async (data) => {
				console.log('Success:', data)
				await queryClient.invalidateQueries({ queryKey: ['isConnected'] })
				await navigate({ to: '/' })
			}}
			buttonLabel="S'inscrire"
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
						Vous avez déjà un compte ?{' '}
						<Link className="underline" to="/connexion">
							Connectez-vous
						</Link>
					</span>
				</>
			)}
		</DynamicForm>
	)
}
