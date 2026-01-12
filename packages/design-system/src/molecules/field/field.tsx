import { Field as BaseField } from "@base-ui/react/field";
import React from "react";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	placeholder: string;
	description?: string;
	errorMessage?: string;
}

export const Field = ({
	label,
	placeholder,
	description,
	errorMessage,
	...props
}: FieldProps) => {
	return (
		<BaseField.Root className="flex flex-col gap-1 w-full items-start">
			<BaseField.Label className="text-base text-black font-medium">
				{label}
			</BaseField.Label>
			<BaseField.Control
				required
				placeholder={placeholder}
				className="text-base text-black pl-3.5 border h-10 w-full focus:outline-2 focus:outline-blue-800 focus:outline focus:-outline-offset-1"
				{...props}
			/>
			<BaseField.Error className="text-sm text-red-800" match="valueMissing">
				{errorMessage}
			</BaseField.Error>

			<BaseField.Description className="text-sm text-black/70">
				{description}
			</BaseField.Description>
		</BaseField.Root>
	);
};
