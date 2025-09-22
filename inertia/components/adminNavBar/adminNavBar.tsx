import { Link } from '@inertiajs/react'

export const AdminNavBar = () => {
  return (
    <nav className="w-full h-14 bg-white border-b border-gray-200 shadow-sm flex items-center px-6">
      <ul className="flex items-center gap-6 w-full justify-center">
        <li>
          <Link
            href="/admin/users"
            className="px-3 py-1.5 rounded-lg text-gray-700 font-medium hover:bg-gray-100 hover:text-black transition-colors"
          >
            Utilisateurs
          </Link>
        </li>
        <li>
          <Link
            href="/admin/products"
            className="px-3 py-1.5 rounded-lg text-gray-700 font-medium hover:bg-gray-100 hover:text-black transition-colors"
          >
            Gérer Produits
          </Link>
        </li>
      </ul>
    </nav>
  )
}
