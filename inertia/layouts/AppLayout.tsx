import { Navbar } from '~/components/navbar/Navbar'

type AppLayoutProps = {
  children: React.ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className={'flex flex-col w-full min-h-screen'}>
      <Navbar />

      <main className={'grow min-h-screen'}>{children}</main>

      <footer>
        <div className="flex justify-center items-center h-16 bg-gray-800 text-white">
          <p>&copy; 2025 Atelier Merienne. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}
