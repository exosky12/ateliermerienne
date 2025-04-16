import { NavBar } from '~/components/navBar/navBar'
import type { ReactNode } from 'react'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={'flex flex-col w-full min-h-screen'}>
      <NavBar />

      <main className={'grow min-h-screen'}>{children}</main>
      <footer>
        <div className="flex justify-center items-center h-16 bg-gray-800 text-white">
          <p>&copy; 2025 Atelier Merienne. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}
