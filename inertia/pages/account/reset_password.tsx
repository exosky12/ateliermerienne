import { Head, useForm, usePage } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

export default function ResetPassword() {
  const { email, signedUpdateUrl } = usePage<{ email: string; signedUpdateUrl: string }>().props
  const { data, setData, post, processing, errors } = useForm({
    email: email,
    password: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(signedUpdateUrl)
  }

  return (
    <>
      <Head title="Réinitialiser le mot de passe" />
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-strokeGrey max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center font-serif text-primary">
            Nouveau mot de passe
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-foreground">Mot de passe</Label>
              <Input
                type="password"
                className=""
                value={data.password}
                required
                onChange={(e) => setData('password', e.target.value)}
              />
              {errors.password && (
                <p className="text-destructive text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <Button type="submit" disabled={processing} className="mt-2 w-full">
              Enregistrer le nouveau mot de passe
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
