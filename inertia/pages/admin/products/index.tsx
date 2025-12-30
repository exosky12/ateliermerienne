import { useState, FormEvent, ChangeEvent } from 'react'
import { Head, useForm, router } from '@inertiajs/react'
import { Plus, Pencil, Trash2, MoreHorizontal } from 'lucide-react'

import AdminLayout from '@/components/layout/AdminLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Checkbox } from '@/components/ui/checkbox'

interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  isPublished: boolean
  imageUrl: string
}

interface ProductsProps {
  products: Product[]
}

interface ProductFormData {
  name: string
  description: string
  price: string
  stock: string
  imageUrl: string
  isPublished: boolean
  [key: string]: any // Add index signature for useForm compatibility
}

export default function Products({ products }: ProductsProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm<ProductFormData>({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
    isPublished: false,
  })

  const openCreateModal = () => {
    reset()
    clearErrors()
    setIsCreateOpen(true)
  }

  const openEditModal = (product: Product) => {
    setData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      imageUrl: product.imageUrl,
      isPublished: product.isPublished,
    })
    clearErrors()
    setEditingProduct(product)
  }

  const closeEditModal = () => {
    setEditingProduct(null)
    reset()
  }

  const submitCreate = (e: FormEvent) => {
    e.preventDefault()
    post('/admin/products', {
      onSuccess: () => {
        setIsCreateOpen(false)
        reset()
      },
    })
  }

  const submitEdit = (e: FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return

    put(`/admin/products/${editingProduct.id}`, {
      onSuccess: () => {
        closeEditModal()
      },
    })
  }

  const deleteProduct = (id: number) => {
    router.delete(`/admin/products/${id}`)
  }

  return (
    <>
      <Head title="Gestion des produits" />

      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Produits</h2>
          <p className="text-muted-foreground">
            Gérez votre catalogue de produits, les stocks et les prix.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={openCreateModal}>
            <Plus className="mr-2 h-4 w-4" /> Ajouter un produit
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Catalogue</CardTitle>
          <CardDescription>
            Liste de tous les produits disponibles dans la boutique.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="aspect-square rounded-md object-cover h-12 w-12"
                      />
                    ) : (
                      <div className="aspect-square rounded-md bg-muted h-12 w-12" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.price} €</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge variant={product.isPublished ? 'default' : 'secondary'}>
                      {product.isPublished ? 'Publié' : 'Brouillon'}
                    </Badge>
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
                        <DropdownMenuItem onClick={() => openEditModal(product)}>
                          <Pencil className="mr-2 h-4 w-4" /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e: Event) => e.preventDefault()} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Cette action est irréversible. Cela supprimera définitivement le produit "{product.name}".
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteProduct(product.id)} className="bg-red-600 hover:bg-red-700">
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter un produit</DialogTitle>
            <DialogDescription>
              Créez un nouveau produit pour votre boutique.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitCreate} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setData('name', e.target.value)}
                required
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={data.description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setData('description', e.target.value)}
                required
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Prix (€)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={data.price}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setData('price', e.target.value)}
                  required
                />
                {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={data.stock}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setData('stock', e.target.value)}
                  required
                />
                {errors.stock && <p className="text-sm text-red-500">{errors.stock}</p>}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">URL de l'image</Label>
              <Input
                id="imageUrl"
                type="url"
                value={data.imageUrl}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setData('imageUrl', e.target.value)}
                required
              />
              {errors.imageUrl && <p className="text-sm text-red-500">{errors.imageUrl}</p>}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPublished"
                checked={data.isPublished}
                onCheckedChange={(checked: boolean | "indeterminate") => setData('isPublished', checked === true)}
              />
              <Label htmlFor="isPublished">Publier immédiatement</Label>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={processing}>Créer le produit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingProduct} onOpenChange={(open: boolean) => !open && closeEditModal()}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier le produit</DialogTitle>
            <DialogDescription>
              Modifiez les détails du produit.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitEdit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Nom</Label>
              <Input
                id="edit-name"
                value={data.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setData('name', e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={data.description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setData('description', e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Prix (€)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  value={data.price}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setData('price', e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-stock">Stock</Label>
                <Input
                  id="edit-stock"
                  type="number"
                  value={data.stock}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setData('stock', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-imageUrl">URL de l'image</Label>
              <Input
                id="edit-imageUrl"
                type="url"
                value={data.imageUrl}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setData('imageUrl', e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-isPublished"
                checked={data.isPublished}
                onCheckedChange={(checked: boolean | "indeterminate") => setData('isPublished', checked === true)}
              />
              <Label htmlFor="edit-isPublished">Publié</Label>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={processing}>Enregistrer les modifications</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

Products.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>