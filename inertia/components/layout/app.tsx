import { NavBar } from '~/components/navBar/navBar'
import { ReactNode, useEffect } from 'react'

import type { PageProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/react'
import { AdminNavBar } from '~/components/adminNavBar/adminNavBar'
import { Toaster } from '~/components/ui/sonner'
import { toast } from 'sonner'

export interface AuthPageProps extends PageProps {
  user: {
    id: number
    email: string
    isAdmin: boolean
  } | null
  flash: {
    success?: string
    error?: string
    info?: string
    warning?: string
  }
}

export function Layout({ children }: { children: ReactNode }) {
  const props = usePage<AuthPageProps>().props
  const flash = props.flash

  useEffect(() => {
    if (flash.success) toast.success(flash.success)
    if (flash.error) toast.error(flash.error)
    if (flash.info) toast.info(flash.info)
    if (flash.warning) toast.warning(flash.warning)
  }, [flash])

  return (
    <div
      className={
        'flex text-[16px] flex-col w-full min-h-screen bg-background text-primary font-geist'
      }
    >
      <Toaster />
      <NavBar />

      {props.user?.isAdmin && <AdminNavBar />}

      <main className={'grow min-h-screen font-geist'}>{children}</main>
    </div>
  )
}
