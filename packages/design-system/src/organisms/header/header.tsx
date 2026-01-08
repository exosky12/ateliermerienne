import { Icon } from "@packages/design-system/icon";
import { Link } from "@tanstack/react-router";
import { Select } from "@packages/design-system/select";

export const Header = () => {
	return (
		<header className="flex w-full justify-between mt-4 mx-9 items-center">
			<nav>
				<ul className="flex text-sm flew-row gap-5 uppercase">
					<Link className="hover:underline" to="/">
						Nouveautés
					</Link>
					<Link className="hover:underline" to="/">
						Les créations
					</Link>
					<Link className="hover:underline" to="/">
						L'atelier
					</Link>
					<Link className="hover:underline" to="/">
						Sur-mesure
					</Link>
					<Link className="hover:underline" to="/">
						Conciergerie
					</Link>
				</ul>
			</nav>
			<div className="flex gap-4">
				<Select
					selectItems={[
						{
							label: "Français",
							value: "fr",
						},
						{
							label: "Anglais",
							value: "en",
						},
					]}
					defaultSelected="fr"
				/>
				<div className="flex gap-2">
					<Icon name="search" />
					<Icon name="bag" />
					<Icon name="account" />
				</div>
			</div>
		</header>
	);
};
