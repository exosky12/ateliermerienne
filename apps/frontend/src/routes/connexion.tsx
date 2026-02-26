import { Image } from '@unpic/react'
import { Field } from '@packages/design-system/field'
import { useQueryClient } from '@tanstack/react-query'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'

import { api } from '@/lib/tuyau.ts'
import { DynamicForm } from '@/components/dynamic_form'

export const Route = createFileRoute('/connexion')({
	component: RouteComponent,
})

function RouteComponent() {
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	return (
		<div className="flex h-full w-full items-center">
			<div className="w-1/2">
				<DynamicForm
					defaultValues={{
						email: '',
						password: '',
					}}
					transformValues={(values) => ({ body: values })}
					mutationOptions={api.signIn.execute.mutationOptions({
						onSuccess: async () => {
							await queryClient.invalidateQueries({ queryKey: ['isConnected'] })
							navigate({ to: '/profile' })
						},
					})}
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
			</div>
			<div className="w-1/2">
				<Image alt="Photo d'une fauteuil" src="landing_card2.png" width={1920} height={1080} />
			</div>
		</div>
	)
}
