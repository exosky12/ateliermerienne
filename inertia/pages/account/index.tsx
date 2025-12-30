import { Head, usePage, useForm, Link, router } from '@inertiajs/react'
import type User from '#models/user'
import type Order from '#models/order'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

export default function Account() {
  const { user, orders } = usePage<{ user: User; orders: Order[] }>().props
  const [activeTab, setActiveTab] = useState('profile')

  const { data, setData, post, processing } = useForm({
    fullName: user.fullName || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/compte/info')
  }

  return (
    <>
      <Head title="Mon Compte" />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-10 text-center font-serif text-primary">Mon Compte</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 flex flex-col gap-2">
            <Button
              variant={activeTab === 'profile' ? 'secondary' : 'ghost'}
              onClick={() => setActiveTab('profile')}
              className="w-full justify-start text-base"
            >
              Mes informations
            </Button>
            <Button
              variant={activeTab === 'orders' ? 'secondary' : 'ghost'}
              onClick={() => setActiveTab('orders')}
              className="w-full justify-start text-base"
            >
              Mes commandes
            </Button>
            <Button
              variant="ghost"
              asChild
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 mt-8"
            >
              <Link href="/auth/logout">Se déconnecter</Link>
            </Button>
          </div>

          {/* Content */}
          <div className="w-full md:w-3/4">
            {activeTab === 'profile' && (
              <div className="bg-transparent p-0 md:bg-white md:p-6 md:rounded-2xl md:shadow-sm md:border md:border-strokeGrey">
                <h2 className="text-xl font-semibold mb-6 text-primary">
                  Mes informations personnelles
                </h2>

                {/* General Info Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-lg mb-8">
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium text-foreground">Nom complet</Label>
                    <Input
                      type="text"
                      className=""
                      value={data.fullName}
                      onChange={(e) => setData('fullName', e.target.value)}
                    />
                  </div>
                  <Button type="submit" disabled={processing} className="self-start">
                    Mettre à jour mon nom
                  </Button>
                </form>

                <div className="border-t border-strokeGrey pt-8 flex flex-col gap-6 max-w-lg">
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium text-foreground">Email</Label>
                    <div className="flex items-center justify-between p-4 border border-strokeGrey rounded-2xl bg-white text-foreground">
                      <span>{user.email}</span>
                      <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded">
                        Vérifié
                      </span>
                    </div>
                    <Button
                      variant="link"
                      onClick={() => router.post('/compte/email/request')}
                      className="self-start p-0 h-auto text-sm text-foreground hover:text-accent underline underline-offset-4"
                    >
                      Modifier mon adresse email
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      Un lien de sécurité vous sera envoyé par email.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium text-foreground">Mot de passe</Label>
                    <Input
                      type="password"
                      disabled
                      value="********"
                      className="bg-white text-muted-foreground"
                    />
                    <Button
                      variant="link"
                      onClick={() => router.post('/compte/password/request')}
                      className="self-start p-0 h-auto text-sm text-foreground hover:text-accent underline underline-offset-4"
                    >
                      Modifier mon mot de passe
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      Un lien de réinitialisation vous sera envoyé par email.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold mb-2 text-primary">
                  Historique des commandes
                </h2>
                {orders.length === 0 ? (
                  <div className="bg-white p-8 rounded-2xl border border-strokeGrey text-center text-muted-foreground">
                    Vous n'avez pas encore passé de commande.
                  </div>
                ) : (
                  orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white p-6 rounded-2xl shadow-sm border border-strokeGrey"
                    >
                      <div className="flex flex-wrap justify-between items-start mb-4 border-b border-strokeGrey pb-4 gap-4">
                        <div>
                          <p className="font-semibold text-primary">Commande #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt as unknown as string).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">
                            {(order.totalAmount / 100).toFixed(2)} €
                          </p>
                          <span
                            className={`inline-block px-2 py-0.5 text-xs rounded-full mt-1 ${
                              order.status === 'paid'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {order.status === 'paid' ? 'Payée' : order.status}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between text-sm text-foreground"
                          >
                            <span>
                              {item.quantity}x {item.productName}
                            </span>
                            <span>{(item.price / 100).toFixed(2)} €</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
