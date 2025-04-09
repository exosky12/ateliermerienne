import { type NavLink } from '~/components/navbar/Navbar'
import { useState } from 'react'
import { Link } from '@inertiajs/react'
import { Menu, X } from 'lucide-react'

type MobileNavBarProps = {
  links: NavLink[]
}

export const MobileNav = ({ links }: MobileNavBarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="xl:hidden">
      <button
        onClick={handleClick}
        className="p-2"
        aria-label={isOpen ? 'Fermer menu' : 'Ouvrir menu'}
      >
        {isOpen ? <X strokeWidth={1} /> : <Menu strokeWidth={1} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white z-50 border-b border-black py-4 px-6">
          <ul className="flex flex-col gap-4">
            {links.map((link: NavLink) => (
              <li key={link.href}>
                <Link href={link.href} onClick={handleClick} className="block py-2">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
