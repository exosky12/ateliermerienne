import { Icon } from "@packages/design-system/icon";
import { Link } from "@tanstack/react-router";
import { Select } from "@packages/design-system/select";
import { useEffect, useState } from "react";
import { Button } from "@packages/design-system/button";

export const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`flex w-full fixed justify-between py-4 px-9 items-center font-light transition-colors duration-300 z-50 ${
				isScrolled ? "bg-white text-black" : "bg-transparent text-white"
			}`}
		>
			<nav>
				<ul className="flex text-sm flew-row gap-5 uppercase">
					<Button size="sm" outlined={false} href="/">
						Nouveautés
					</Button>
					<Button size="sm" outlined={false} href="/">
						Les créations
					</Button>
					<Button size="sm" outlined={false} href="/">
						L'atelier
					</Button>
					<Button size="sm" outlined={false} href="/">
						Sur-mesure
					</Button>
					<Button size="sm" outlined={false} href="/">
						Conciergerie
					</Button>
				</ul>
			</nav>
			<div className="flex gap-6 items-center">
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
				<div className="flex gap-1">
					<div className="h-8 w-8">
						<Icon
							width={24}
							height={24}
							className="cursor-pointer"
							name="search"
						/>
					</div>
					<div className="h-8 w-8">
						<Icon
							width={24}
							height={24}
							className="cursor-pointer"
							name="bag"
						/>
					</div>
					<div className="h-8 w-8">
						<Icon
							width={24}
							height={24}
							className="cursor-pointer"
							name="account"
						/>
					</div>
				</div>
			</div>
		</header>
	);
};
