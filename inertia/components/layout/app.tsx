import { NavBar } from '~/components/navBar/navBar'
import { ReactNode } from 'react'

import type { PageProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/react'
import { AdminNavBar } from '~/components/adminNavBar/adminNavBar'

// import { addCorners } from '@monokai/monoco'

export interface AuthPageProps extends PageProps {
  auth: {
    user: {
      id: number
      email: string
      isAdmin: boolean
    } | null
  }
}

export function Layout({ children }: { children: ReactNode }) {
  // useEffect(() => {
  //   const btns = document.querySelectorAll('.btn') as NodeListOf<HTMLElement>
  //   btns.forEach((btn) =>
  //     addCorners(btn, {
  //       smoothing: 1,
  //       borderRadius: 16,
  //       clip: true,
  //     })
  //   )
  // }, [])
  const props: any = usePage().props

  console.log(props)

  return (
    <div
      className={
        'flex text-[16px] flex-col w-full min-h-screen bg-background text-primary font-geist'
      }
    >
      <NavBar />

      {props.user?.isAdmin && props.user?.isAdmin && <AdminNavBar />}

      <main className={'grow min-h-screen font-geist'}>{children}</main>
    </div>
  )
}
