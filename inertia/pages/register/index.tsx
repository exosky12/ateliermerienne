import { Head, Link, usePage } from '@inertiajs/react'
import { Socials } from '~/components/socials/socials'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

interface RegisterProps {
  csrfToken: string
}

export default function Register({ csrfToken }: RegisterProps) {
  const { props } = usePage()
  const errors = props.errors ?? {}

  return (
    <div className={'flex h-screen w-full'}>
      <Head title="Inscription" />
      <div className={'w-full m-8 md:m-0 md:w-1/2 h-screen'}>
        <div
          className={
            'flex w-auto max-w-lg h-auto flex-col gap-8 items-left m-auto mt-18 md:ml-[15%] md:mt-[10%]'
          }
        >
          <div className={'flex flex-col gap-2'}>
            <h1 className={'font-title font-italic text-[32px]'}>Créer un compte</h1>
            <p className={'text-base'}>
              Rejoignez notre espace pour suivre vos commandes, enregistrer vos préférences et
              profiter de tous nos services.
            </p>
          </div>
          <Socials />
          <div className={'w-full flex gap-2 justify-between items-center'}>
            <div className={'bg-strokeGrey w-full h-0.5'}></div>
            <span className={'text-textGrey text-xs'}>ou</span>
            <div className={'bg-strokeGrey w-full h-0.5'}></div>
          </div>
          <form
            className="flex items-center w-full flex-col gap-6"
            method="POST"
            action={'/auth/inscription'}
            suppressHydrationWarning
          >
            <input type="hidden" name="_csrf" value={csrfToken} />
            <div className="w-full flex flex-col gap-4">
              <div className={'flex flex-col gap-1'}>
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <Input type={'email'} placeholder={'atelier@merienne.fr'} />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>
              <div className={'flex flex-col gap-1'}>
                <label htmlFor="password" className="text-sm">
                  Mot de passe
                </label>
                <Input type={'password'} placeholder={'********'} />
                {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
              </div>
              <div className={'flex flex-col gap-1'}>
                <label htmlFor="confirmPassword" className="text-sm">
                  Confirmer le mot de passe
                </label>

                <Input type={'password'} id={'confirmPassword'} placeholder={'********'} />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
                )}
              </div>
            </div>
            <Button type={'submit'} className="w-full">
              S'inscrire
            </Button>
          </form>
          <span className={'text-sm'}>
            Vous avez déjà un compte ?{' '}
            <Link className={'underline text-accent'} href={'/auth/connexion'}>
              Connectez-vous
            </Link>
          </span>
        </div>
      </div>
      <div className="hidden relative w-1/2 h-5/6 mt-12 md:flex">
        <div className="absolute inset-6 rounded-[33px] overflow-hidden">
          <img src="/authImage.png" alt="Rose" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  )
}
