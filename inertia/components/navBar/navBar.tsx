import { MobileNav } from '~/components/navBar/mobileNav'
import { Link } from '@inertiajs/react'
import { Search, ShoppingBasket, UserRound } from 'lucide-react'

const NavLinks = [
  { href: '/creations', label: 'explorer' },
  { href: '/creations?cat=deco-art', label: 'Déco & art de la table' },
  { href: '/creations?cat=bijoux', label: 'Bijoux' },
  { href: '/creations?cat=maroquinerie', label: 'Maroquinerie' },
  { href: '/creations?cat=bebe', label: 'Bébés' },
]

export type NavLink = (typeof NavLinks)[number]

export const NavBar = () => {
  return (
    <header
      className={
        'sticky top-0 z-50 flex bg-background border-primary border-b-2 justify-between items-center py-4 xl:py-9 px-4 md:px-[4%]'
      }
    >
      <h1 className="font-title font-bold text-xl">Atelier Merienne</h1>
      <MobileNav links={NavLinks} />

      <ul className="hidden xl:flex gap-6 text-sm">
        {NavLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>

      <div className="inline-flex gap-3">
        <Link href={''}>
          <Search strokeWidth={1} />
        </Link>

        <Link href={'/'}>
          <UserRound strokeWidth={1} />
        </Link>

        <Link href={''}>
          <ShoppingBasket strokeWidth={1} />
        </Link>
      </div>
    </header>
  )
}
