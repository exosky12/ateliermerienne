import type { ReactNode } from 'react'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { Form as DSForm } from '@packages/design-system/form'
import type { UseMutationOptions } from '@tanstack/react-query'

interface DynamicFormProps<TFormValues, TMutationData, TResponse, TError = Error> {
	defaultValues: TFormValues
	mutationOptions: UseMutationOptions<TResponse, TError, TMutationData>
	transformValues: (values: TFormValues) => TMutationData
	buttonLabel: string
	children: (form: any) => ReactNode
}

export function DynamicForm<TFormValues, TMutationData, TResponse, TError = Error>({
	defaultValues,
	mutationOptions,
	transformValues,
	buttonLabel,
	children,
}: DynamicFormProps<TFormValues, TMutationData, TResponse, TError>) {
	const mutation = useMutation(mutationOptions)

	const form = useForm({
		defaultValues: defaultValues as any,
		onSubmit: async ({ value }) => {
			await mutation.mutateAsync(transformValues(value as TFormValues))
		},
	})

	return (
		<DSForm
			buttonLabel={buttonLabel}
			onSubmit={(e) => {
				e.preventDefault()
				e.stopPropagation()
				form.handleSubmit()
			}}
		>
			{children(form)}
		</DSForm>
	)
}
