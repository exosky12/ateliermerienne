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
			<BaseSelect.Trigger className="flex items-center gap-1.5 cursor-pointer text-sm">
				<BaseSelect.Value />
				<BaseSelect.Icon>
					<Icon width={12} height={12} name="chevron-down" />
				</BaseSelect.Icon>
			</BaseSelect.Trigger>
			<BaseSelect.Portal>
				<BaseSelect.Positioner className="outline-none" sideOffset={8}>
					<BaseSelect.Popup className="origin-[var(--transform-origin)] rounded-md bg-[canvas] py-1 text-gray-900 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300 bg-white min-w-[120px]">
						{selectItems.map((item) => (
							<BaseSelect.Item
								key={item.value}
								value={item.value}
								className="flex cursor-pointer hover:underline py-2 pr-4 pl-4 text-sm leading-4 outline-none select-none justify-between items-center"
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
