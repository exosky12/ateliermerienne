import { Head, Link, usePage } from '@inertiajs/react'
import { Socials } from '~/components/socials/socials'
import { Button } from '~/components/button/button'

interface RegisterProps {
  fileURL: string
  csrfToken: string
}

export default function Register({ fileURL, csrfToken }: RegisterProps) {
  const { props } = usePage()
  const errors = props.errors ?? {}
  return (
    <div className="flex h-screen">
      <Head title="Inscription" />
      <div className="flex flex-col flex-1 justify-center xl:max-w-full m-auto w-full sm:max-w-2/3 items-center gap-12 px-8">
        <h2 className="font-title font-bold text-5xl">S'inscrire</h2>

        <Socials />

        <div className="flex items-center justify-center w-full gap-4">
          <div className="h-0.5 w-full bg-primary"></div>
          <p className="whitespace-nowrap">OU ALORS</p>
          <div className="h-0.5 w-full bg-primary"></div>
        </div>

        <form
          className="flex items-center w-full flex-col gap-4"
          method="POST"
          action={'/inscription'}
          suppressHydrationWarning
        >
          <input type="hidden" name="_csrf" value={csrfToken} />
          <div className={'w-full'}>
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="atelier@merienne.fr"
              className="rounded-xl border-primary border-2 p-4 w-full"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>

          <div className={'w-full'}>
            <label htmlFor="password" className="text-lg">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              className="rounded-xl border-primary border-2 p-4 w-full"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>

          <div className={'w-full'}>
            <label htmlFor="confirmPassword" className="text-lg">
              Confirmer le de passe
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="********"
              className="rounded-xl border-primary border-2 p-4 w-full"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
            )}
          </div>
          <Button type={'submit'} text="S'inscire" />
        </form>
        <span>
          Vous avez déjà un compte ?{' '}
          <Link className={'underline'} href={'/connexion'}>
            Connectez-vous
          </Link>{' '}
        </span>
      </div>
      <div className="hidden xl:h-full xl:flex">
        <img src={fileURL} alt="Sac Sweety" className="h-full rounded-none w-auto object-cover" />
      </div>
    </div>
  )
}
