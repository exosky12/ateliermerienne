import { Head, Link } from '@inertiajs/react'
import { CheckCircle } from 'lucide-react'

export default function Success() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Head title="Paiement réussi" />
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Paiement réussi !</h1>
                <p className="text-gray-600 mb-6">
                    Merci pour votre commande. Vous recevrez bientôt un email de confirmation.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    )
}
