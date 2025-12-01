import { Head, Link } from '@inertiajs/react'
import { XCircle } from 'lucide-react'

export default function Cancel() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Head title="Paiement annulé" />
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">
                    <XCircle className="h-16 w-16 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Paiement annulé</h1>
                <p className="text-gray-600 mb-6">
                    Le processus de paiement a été annulé. Aucun débit n'a été effectué.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    )
}
