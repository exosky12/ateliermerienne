import { MobileNav } from '~/components/navbar/MobileNav'
import { Link } from '@inertiajs/react'
import { Search, ShoppingBasket, UserRound } from 'lucide-react'

const NavLinks = [
  { href: '/creations', label: 'Tout' },
  { href: '/creations?cat=deco-art', label: 'Déco & art de la table' },
  { href: '/creations?cat=bijoux', label: 'Bijoux' },
  { href: '/creations?cat=maroquinerie', label: 'Maroquinerie' },
  { href: '/creations?cat=bebe', label: 'Bébés' },
]

export type NavLink = (typeof NavLinks)[number]

export const Navbar = () => {
  return (
    <header
      className={
        'sticky top-0 bg-white z-50 flex border-b border-black justify-between items-center py-4 xl:py-9 px-4 md:px-[4%] relative'
      }
    >
      <MobileNav links={NavLinks} />

      <ul className="hidden xl:flex gap-4 text-sm">
        {NavLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>

      <Link
        className="text-xl sm:text-2xl md:text-3xl absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        href="/"
      >
        <h1 className="font-title font-semibold text-center">Atelier Merienne</h1>
        <span className="text-xs sm:text-sm md:text-base flex justify-center items-center gap-1 md:gap-2">
          Artisanat Français{' '}
          <svg
            width="60"
            height="12"
            viewBox="0 0 90 10"
            className="w-16 h-6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="30" height="10" fill="#000091" />
            <rect x="30" width="30" height="10" fill="white" />
            <rect x="60" width="30" height="10" fill="#E1000F" />
          </svg>
        </span>
      </Link>

      <div className="inline-flex gap-3">
        <Link href={''}>
          <Search strokeWidth={1} />
        </Link>

        <Link href={''}>
          <UserRound strokeWidth={1} />
        </Link>

        <Link href={''}>
          <ShoppingBasket strokeWidth={1} />
        </Link>
      </div>
    </header>
  )
}
