import { Head, Link, usePage } from '@inertiajs/react'
import { Socials } from '~/components/socials/socials'
import { Button } from '~/components/button/button'

interface LoginProps {
  fileURL: string
  csrfToken: string
}

export default function Login({ fileURL, csrfToken }: LoginProps) {
  const { props } = usePage()
  const errors = props.errors ?? {}
  return (
    <div className="flex h-screen">
      <Head title="Connexion" />
      <div className="flex flex-col flex-1 justify-center xl:max-w-full m-auto max-w-2/3 items-center gap-12 px-8">
        <h2 className="font-title font-bold text-5xl">Se connecter</h2>

        <Socials />

        <div className="flex items-center justify-center w-full gap-4">
          <div className="h-0.5 w-full bg-primary"></div>
          <p className="whitespace-nowrap">OU ALORS</p>
          <div className="h-0.5 w-full bg-primary"></div>
        </div>

        <form
          className="flex items-center w-full flex-col gap-4"
          method="POST"
          action={'/connexion'}
          suppressHydrationWarning
        >
          <input type="hidden" name="_csrf" value={csrfToken} />
          <div className="w-full">
            <div>
              <label htmlFor="email" className="text-lg">
                Email
              </label>
              <input
                id="email"
                type="email"
                name={'email'}
                placeholder="atelier@merienne.fr"
                className="rounded-xl border-primary border-2 p-4 w-full"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>

            <div>
              <label htmlFor="password" className="text-lg">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                name={'password'}
                placeholder="********"
                className="rounded-xl border-primary border-2 p-4 w-full"
              />
              <div className={'flex flex-col'}>
                {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                <Link href={'/'} className={'underline'}>
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>
          </div>
          {errors.E_INVALID_CREDENTIALS && (
            <span className="text-red-500 text-sm">{errors.E_INVALID_CREDENTIALS}</span>
          )}
          <Button type={'submit'} text="Se connecter" />
        </form>

        <span>
          Vous n'avez pas encore de compte ?{' '}
          <Link className={'underline'} href={'/inscription'}>
            Inscrivez-vous
          </Link>{' '}
        </span>
      </div>
      <div className="hidden xl:h-full xl:flex">
        <img src={fileURL} alt="Sac Sweety" className="h-full rounded-none w-auto object-cover" />
      </div>
    </div>
  )
}
