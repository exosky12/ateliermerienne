import { Head, useForm, usePage } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

export default function ChangeEmail() {
  const { userId, signedUpdateUrl } = usePage<{ userId: number; signedUpdateUrl: string }>().props
  const { data, setData, post, processing, errors } = useForm({
    userId: userId,
    email: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(signedUpdateUrl)
  }

  return (
    <>
      <Head title="Modifier l'email" />
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-strokeGrey max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center font-serif text-primary">
            Nouvelle adresse email
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">Email</Label>
              <Input
                type="email"
                className=""
                value={data.email}
                required
                onChange={(e) => setData('email', e.target.value)}
              />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>

            <Button type="submit" disabled={processing} className="mt-2 w-full">
              Valider la nouvelle adresse
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
