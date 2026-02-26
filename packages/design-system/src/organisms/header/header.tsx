import { useEffect, useState } from "react";
import { Icon } from "@packages/design-system/icon";
import { Button } from "@packages/design-system/button";
import { Select } from "@packages/design-system/select";

interface HeaderProps {
	isConnected: boolean;
}

export const Header = ({
	isConnected,
	pathname = window.location.pathname,
}: HeaderProps & { pathname?: string }) => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		handleScroll();

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const isHome = pathname === "/";
	const showWhiteBackground = !isHome || isScrolled;

	return (
		<header
			className={`font-light px-9 py-4 flex w-full transition-colors duration-300 items-center justify-between fixed z-50 ${
				showWhiteBackground
					? "bg-white text-black"
					: "bg-transparent text-white"
			}`}
		>
			<nav>
				<ul className="flew-row text-sm flex gap-5 uppercase">
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
				<div className="flex gap-1 items-center">
					<Button
						className="px-0 flex h-8 w-8 items-center justify-center"
						size="sm"
						outlined={false}
						href="/search"
					>
						<Icon width={24} height={24} name="search" />
					</Button>
					<Button
						className="px-0 flex h-8 w-8 items-center justify-center"
						size="sm"
						outlined={false}
						href="/panier"
					>
						<Icon width={24} height={24} name="bag" />
					</Button>
					<Button
						className="px-0 flex h-8 w-8 items-center justify-center"
						size="sm"
						outlined={false}
						href={isConnected ? "/profile" : "/connexion"}
					>
						<Icon width={24} height={24} name="account" />
					</Button>
				</div>
			</div>
		</header>
	);
};
