import { Select as BaseSelect } from "@base-ui/react/select";
import { Icon } from "@packages/design-system/icon";

interface SelectProps {
	selectItems: {
		label: string;
		value: string;
	}[];
	defaultSelected?: string;
}

export const Select = ({
	selectItems = [
		{
			label: "Français",
			value: "fr",
		},
		{
			label: "Anglais",
			value: "en",
		},
	],
	defaultSelected,
}: SelectProps) => {
	return (
		<BaseSelect.Root items={selectItems} defaultValue={defaultSelected}>
			<BaseSelect.Trigger className="group text-sm flex gap-1.5 cursor-pointer items-center">
				<BaseSelect.Value />
				<BaseSelect.Icon>
					<Icon
						width={12}
						height={12}
						name="chevron-down"
						className="transition-transform duration-200 group-data-[popup-open]:rotate-180"
					/>
				</BaseSelect.Icon>
			</BaseSelect.Trigger>
			<BaseSelect.Portal>
				<BaseSelect.Positioner
					className="outline-none z-50"
					sideOffset={8}
					side="bottom"
					align="start"
					alignItemWithTrigger={false}
				>
					<BaseSelect.Popup className="transition-[transform,scale,opacity] py-1 border bg-white min-w-[120px] origin-[var(--transform-origin)] duration-200 ease-out overflow-hidden dark:outline-gray-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:shadow-none data-[ending-style]:scale-90 data-[starting-style]:scale-90 dark:-outline-offset-1">
						{selectItems.map((item) => (
							<BaseSelect.Item
								key={item.value}
								value={item.value}
								className="text-sm py-2 pl-4 pr-4 outline-none flex cursor-pointer select-none items-center justify-between hover:underline"
							>
								<BaseSelect.ItemText>{item.label}</BaseSelect.ItemText>
								<BaseSelect.ItemIndicator>
									<Icon name="check" width={10} height={10} />
								</BaseSelect.ItemIndicator>
							</BaseSelect.Item>
						))}
					</BaseSelect.Popup>
				</BaseSelect.Positioner>
			</BaseSelect.Portal>
		</BaseSelect.Root>
	);
};
