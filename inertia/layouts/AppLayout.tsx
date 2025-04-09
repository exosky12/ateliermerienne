import { Navbar } from '~/components/navbar/Navbar'

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />

      <main className={'grow min-h-screen'}>{children}</main>

      <footer>
        <div className="flex justify-center items-center h-16 bg-gray-800 text-white">
          <p>&copy; 2025 Atelier Merienne. Tous droits réservés.</p>
        </div>
      </footer>
    </>
  )
}
