import type { ReactNode } from 'react'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { Form as DSForm } from '@packages/design-system/form'

interface DynamicFormProps<TData, TResponse> {
	defaultValues: TData
	mutationFn: (data: TData) => Promise<TResponse>
	onSuccess?: (data: TResponse) => void
	onError?: (error: Error) => void
	buttonLabel: string
	children: (form: any) => ReactNode
}

export function DynamicForm<TData, TResponse>({
	defaultValues,
	mutationFn,
	onSuccess,
	onError,
	buttonLabel,
	children,
}: DynamicFormProps<TData, TResponse>) {
	const mutation = useMutation({
		mutationFn,
		onSuccess,
		onError,
	})

	const form = useForm({
		defaultValues: defaultValues as any,
		onSubmit: async ({ value }) => {
			await mutation.mutateAsync(value)
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
