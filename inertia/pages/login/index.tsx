import { Head, Link, usePage } from '@inertiajs/react'
import { Socials } from '~/components/socials/socials'
import { Button } from '~/components/button/button'

interface LoginProps {
  csrfToken: string
}

export default function Login({ csrfToken }: LoginProps) {
  const { props } = usePage()
  const errors = props.errors ?? {}
  return (
    <div className={'flex h-screen w-full'}>
      <Head title="Connexion" />
      <div className={'w-full m-8 md:m-0 md:w-1/2 h-screen'}>
        <div
          className={
            'flex w-auto max-w-lg h-auto flex-col gap-8 items-left m-auto mt-18 md:ml-[15%] md:mt-[15%]'
          }
        >
          <div className={'flex flex-col gap-2'}>
            <h1 className={'font-title font-italic text-[32px]'}>Re-bonjour !</h1>
            <p className={'text-base'}>
              Accédez à votre espace personnel pour suivre vos commandes, enregistrer vos
              préférences et retrouver l’historique de vos réparations ou créations sur mesure.
            </p>
          </div>
          <Socials />
          <div
            className={'w-full flex gap-2 justify-between align-center text-centre items-center'}
          >
            <div className={'bg-strokeGrey w-full h-0.5'}></div>
            <span className={'text-textGrey text-xs'}>ou</span>
            <div className={'bg-strokeGrey w-full h-0.5'}></div>
          </div>
          <form
            className="flex items-center w-full flex-col gap-6"
            method="POST"
            action={'/auth/connexion'}
            suppressHydrationWarning
          >
            <input type="hidden" name="_csrf" value={csrfToken} />
            <div className="w-full flex flex-col gap-4">
              <div className={'flex flex-col gap-1'}>
                <label htmlFor="email" className="text-sm ">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name={'email'}
                  placeholder="atelier@merienne.fr"
                  className="rounded-2xl border-strokeGrey p-4"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
              </div>

              <div className={'flex flex-col gap-1'}>
                <div className={'flex w-full justify-between'}>
                  <label htmlFor="password" className="text-sm ">
                    Mot de passe
                  </label>

                  <Link href={'/'} className={'text-sm text-accent'}>
                    Mot de passe oublié ?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  name={'password'}
                  placeholder="********"
                  className="rounded-2xl  border-strokeGrey p-4 "
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
              </div>
            </div>
            {errors.E_INVALID_CREDENTIALS && (
              <span className="text-red-500 text-sm">{errors.E_INVALID_CREDENTIALS}</span>
            )}
            <Button type={'submit'} text="Se connecter" />
          </form>
          <span className={'text-sm'}>
            Vous n'avez pas encore de compte ?{' '}
            <Link className={'underline text-accent'} href={'/auth/inscription'}>
              Inscrivez-vous
            </Link>
          </span>
        </div>
      </div>
      <div className="hidden relative w-1/2 h-screen md:flex">
        <div className="absolute inset-6 bg-accent rounded-[33px] flex items-center justify-center">
          <img src="/rose.png" alt="Rose" className="max-h-[80%]" />
        </div>
      </div>
    </div>
    // <div className="flex h-screen">
    //   <div className="flex flex-col z-10 flex-1 justify-center m-auto max-w-screen sm:max-w-2/3 items-center gap-12 px-2 sm:px-8">
    //     <h2 className="font-title font-bold text-5xl">Se connecter</h2>
    //
    //     <Socials />
    //
    //     <div className="flex items-center justify-center w-full gap-4">
    //       <div className="h-0.5 w-full bg-primary"></div>
    //       <p className="whitespace-nowrap">OU ALORS</p>
    //       <div className="h-0.5 w-full bg-primary"></div>
    //     </div>
    //
    //     <form
    //       className="flex items-center w-full flex-col gap-4"
    //       method="POST"
    //       action={'/connexion'}
    //       suppressHydrationWarning
    //     >
    //       <input type="hidden" name="_csrf" value={csrfToken} />
    //       <div className="w-full">
    //         <div>
    //           <label htmlFor="email" className="text-lg">
    //             Email
    //           </label>
    //           <input
    //             id="email"
    //             type="email"
    //             name={'email'}
    //             placeholder="atelier@merienne.fr"
    //             className="rounded-xl border-primary border-2 p-4 w-full"
    //           />
    //           {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
    //         </div>
    //
    //         <div>
    //           <label htmlFor="password" className="text-lg">
    //             Mot de passe
    //           </label>
    //           <input
    //             id="password"
    //             type="password"
    //             name={'password'}
    //             placeholder="********"
    //             className="rounded-xl border-primary border-2 p-4 w-full"
    //           />
    //           <div className={'flex flex-col'}>
    //             {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
    //             <Link href={'/'} className={'underline'}>
    //               Mot de passe oublié ?
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //       {errors.E_INVALID_CREDENTIALS && (
    //         <span className="text-red-500 text-sm">{errors.E_INVALID_CREDENTIALS}</span>
    //       )}
    //       <Button type={'submit'} text="Se connecter" />
    //     </form>
    //
    //     <span className={'text-center'}>
    //       Vous n'avez pas encore de compte ?{' '}
    //       <Link className={'underline'} href={'/auth/inscription'}>
    //         Inscrivez-vous
    //       </Link>{' '}
    //     </span>
    //   </div>
    // </div>
  )
}
