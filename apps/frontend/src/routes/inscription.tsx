import { Image } from '@unpic/react'
import { Field } from '@packages/design-system/field'
import { useQueryClient } from '@tanstack/react-query'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'

import { tuyau } from '@/lib/tuyau.ts'
import { DynamicForm } from '@/components/DynamicForm'

export const Route = createFileRoute('/inscription')({
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
						fullName: '',
					}}
					mutationFn={async (value) => {
						await tuyau.sign_up.$post(value)
					}}
					onSuccess={async () => {
						await queryClient.invalidateQueries({ queryKey: ['user'] })
						navigate({ to: '/profile' })
					}}
					buttonLabel="S'inscrire"
				>
					{(form) => (
						<>
							<form.Field
								name="fullName"
								children={(field: any) => (
									<Field
										type="text"
										label="Nom complet"
										placeholder="Entrez votre nom complet"
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										errorMessage={field.state.meta.errors.join(', ')}
									/>
								)}
							/>
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
			</div>
			<div className="w-1/2">
				<Image alt="Photo d'une fauteuil" src="landing_card2.png" width={1920} height={1080} />
			</div>
		</div>
	)
}
