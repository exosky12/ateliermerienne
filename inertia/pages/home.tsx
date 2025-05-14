import { Head } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import User from '#models/user'

export default function Home() {
  const { props } = usePage()
  const user = props.user as User
  return (
    <>
      <Head title="Accueil" />

      <h2>{user?.email}</h2>
      <h2>
        Découvrez Sweety, notre sac tonneau au design élégant. Modulable grâce à sa bandoulière
        amovible, il se porte à la main ou à l’épaule. Son cuir raffiné se décline en plusieurs
        teintes, dont l’éclatant Flash Abricot. Fermeture zippée, poche intérieure pratique et
        doublure en Alcantara pour une touche de douceur.
      </h2>
    </>
  )
}
