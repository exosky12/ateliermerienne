import { useState } from 'react'
import { Trash2, User, X } from 'lucide-react'

interface User {
  id: number
  fullName: string
  email: string
  isAdmin: boolean
  createdAt: string
}

interface UsersProps {
  users: User[]
  csrfToken: string
}

export default function Users({ users, csrfToken }: UsersProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* ... ton tableau comme avant */}
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.fullName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.isAdmin ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {user.isAdmin ? 'Oui' : 'Non'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{user.createdAt}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => setSelectedUser(user)}
                  className="inline-flex items-center p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors duration-150"
                  title="Supprimer l'utilisateur"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Confirmer la suppression</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Voulez-vous vraiment supprimer <strong>{selectedUser.fullName}</strong> ?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>

              <form method="POST" action={`/admin/users/${selectedUser.id}?_method=DELETE`}>
                <input type="hidden" name="_csrf" value={csrfToken} />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Supprimer
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
