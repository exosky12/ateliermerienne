import { useState } from 'react'
import { Head, router } from '@inertiajs/react'
import { MoreHorizontal, Trash2, Eye, ShoppingCart, CreditCard } from 'lucide-react'

import AdminLayout from '@/components/layout/AdminLayout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface CartItem {
  id: number
  name: string
  price: number
  imageUrl: string
}

interface User {
  id: number
  fullName: string
  email: string
  isAdmin: boolean
  createdAt: string
  cartCount: number
  cartTotal: number
  cart: CartItem[]
}

interface UsersProps {
  users: User[]
  csrfToken: string
}

export default function Users({ users }: UsersProps) {
  const [viewingUser, setViewingUser] = useState<User | null>(null)
  const [deletingUser, setDeletingUser] = useState<User | null>(null)

  const deleteUser = (id: number) => {
    router.delete(`/admin/users/${id}`, {
      onSuccess: () => setDeletingUser(null),
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <>
      <Head title="Gestion des utilisateurs" />

      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Utilisateurs</h2>
          <p className="text-muted-foreground">
            Gérez les utilisateurs et consultez leurs détails.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Base de données utilisateurs</CardTitle>
          <CardDescription>
            Liste de tous les utilisateurs inscrits sur la plateforme.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Date d'inscription</TableHead>
                <TableHead>Panier</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{getInitials(user.fullName || 'User')}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.fullName || 'Sans nom'}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.isAdmin ? 'default' : 'secondary'}>
                      {user.isAdmin ? 'Admin' : 'Client'}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                      <span>{user.cartCount} articles</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Ouvrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setViewingUser(user)}>
                          <Eye className="mr-2 h-4 w-4" /> Détails
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setDeletingUser(user)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Details Sheet */}
      <Sheet open={!!viewingUser} onOpenChange={(open) => !open && setViewingUser(null)}>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Détails de l'utilisateur</SheetTitle>
            <SheetDescription>
              Informations complètes sur {viewingUser?.fullName}
            </SheetDescription>
          </SheetHeader>

          {viewingUser && (
            <div className="mt-6 space-y-6">
              {/* Profile Info */}
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">{getInitials(viewingUser.fullName || 'User')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{viewingUser.fullName}</h3>
                  <p className="text-muted-foreground">{viewingUser.email}</p>
                  <Badge className="mt-1" variant={viewingUser.isAdmin ? 'default' : 'secondary'}>
                    {viewingUser.isAdmin ? 'Administrateur' : 'Client'}
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Cart Section */}
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" /> Panier en cours
                </h4>
                {viewingUser.cart.length > 0 ? (
                  <div className="space-y-3">
                    {viewingUser.cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 bg-muted/50 p-2 rounded-md">
                        {item.imageUrl && (
                          <img src={item.imageUrl} alt={item.name} className="h-10 w-10 rounded object-cover" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.price} €</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between font-medium pt-2 border-t">
                      <span>Total</span>
                      <span>{viewingUser.cartTotal} €</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Le panier est vide.</p>
                )}
              </div>

              <Separator />

              {/* Payments Section (Placeholder) */}
              <div>
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> Historique des paiements
                </h4>
                <Card>
                  <CardContent className="p-4 text-center text-muted-foreground text-sm">
                    Aucun historique de paiement disponible pour le moment.
                    <br />
                    (Intégration Stripe à venir)
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingUser} onOpenChange={(open) => !open && setDeletingUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Cela supprimera définitivement le compte de "{deletingUser?.fullName}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingUser && deleteUser(deletingUser.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

Users.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>
