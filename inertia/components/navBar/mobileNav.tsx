import { type NavLink } from '~/components/navBar/navBar'
import { Link } from '@inertiajs/react'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '~/components/ui/sheet'
import { Button } from '~/components/ui/button'
import { useState } from 'react'

type MobileNavBarProps = {
  links: NavLink[]
}

export const MobileNav = ({ links }: MobileNavBarProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden order-first">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
            <Menu strokeWidth={2} color={'#4C3225'} />
            <span className="sr-only">Ouvrir menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="text-left font-title font-italic">Menu</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            <ul className="flex flex-col gap-4">
              {links.map((link: NavLink) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-primary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
