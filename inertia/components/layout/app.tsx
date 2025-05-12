import { NavBar } from '~/components/navBar/navBar'
import { ReactNode, useEffect } from 'react'
import { addCorners } from '@monokai/monoco'
import { Footer } from '~/components/footer/footer'

export function Layout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const btns = document.querySelectorAll('.btn') as NodeListOf<HTMLElement>
    btns.forEach((btn) =>
      addCorners(btn, {
        smoothing: 1,
        borderRadius: 18,
        clip: true,
      })
    )
  }, [])
  return (
    <div
      className={
        'flex text-[16px] flex-col w-full min-h-screen bg-background text-primary font-sans'
      }
    >
      <NavBar />

      <main className={'grow min-h-screen'}>{children}</main>
      <Footer />
    </div>
  )
}
