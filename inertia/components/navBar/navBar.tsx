export const NavLinks = [
  { href: '/creations', label: 'explorer' },
  { href: '/creations?cat=art', label: 'déco & art de la table' },
  { href: '/creations?cat=maroquinerie', label: 'maroquinerie' },
  { href: '/creations?cat=bebe', label: 'mondes des bébés' },
  { href: '/creations?cat=bijoux', label: 'bijoux & accessoires' },
]

export type NavLink = (typeof NavLinks)[number]

export const NavBar = () => {
  return (
    // <header
    //   className={
    //     'sticky top-0 z-50 flex bg-background border-primary border-b-2 justify-between items-center px-[20px] xl:px-[120px] py-4'
    //   }
    // >
    //   <Link href={'/'}>
    //     <h1 className="font-title hidden sm:flex font-bold text-xl">Atelier Merienne</h1>
    //   </Link>
    //   <MobileNav links={NavLinks} />
    //
    //   <ul className="hidden lg:flex gap-6">
    //     {NavLinks.map((link) => (
    //       <li key={link.href}>
    //         <Link href={link.href}>{link.label}</Link>
    //       </li>
    //     ))}
    //   </ul>
    //
    //   <div className="inline-flex gap-4">
    //     <Link className={'flex flex-col items-center'} href={'/auth/connexion'}>
    //       <svg
    //         width="25"
    //         height="25"
    //         viewBox="0 0 25 25"
    //         fill="none"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //           d="M12.5 12.5C11.4 12.5 10.4583 12.1083 9.675 11.325C8.89167 10.5417 8.5 9.6 8.5 8.5C8.5 7.4 8.89167 6.45833 9.675 5.675C10.4583 4.89167 11.4 4.5 12.5 4.5C13.6 4.5 14.5417 4.89167 15.325 5.675C16.1083 6.45833 16.5 7.4 16.5 8.5C16.5 9.6 16.1083 10.5417 15.325 11.325C14.5417 12.1083 13.6 12.5 12.5 12.5ZM4.5 18.5V17.7C4.5 17.1333 4.646 16.6127 4.938 16.138C5.23 15.6633 5.61733 15.3007 6.1 15.05C7.13333 14.5333 8.18333 14.146 9.25 13.888C10.3167 13.63 11.4 13.5007 12.5 13.5C13.6 13.4993 14.6833 13.6287 15.75 13.888C16.8167 14.1473 17.8667 14.5347 18.9 15.05C19.3833 15.3 19.771 15.6627 20.063 16.138C20.355 16.6133 20.5007 17.134 20.5 17.7V18.5C20.5 19.05 20.3043 19.521 19.913 19.913C19.5217 20.305 19.0507 20.5007 18.5 20.5H6.5C5.95 20.5 5.47933 20.3043 5.088 19.913C4.69667 19.5217 4.50067 19.0507 4.5 18.5Z"
    //           fill="#4C3225"
    //         />
    //       </svg>
    //       <span>compte</span>
    //     </Link>
    //
    //     <Link className={'flex flex-col items-center'} href={''}>
    //       <svg
    //         width="25"
    //         height="25"
    //         viewBox="0 0 25 25"
    //         fill="none"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //           fillRule="evenodd"
    //           clipRule="evenodd"
    //           d="M8.75048 6.515V5.5C8.75048 4.50544 9.14556 3.55161 9.84882 2.84835C10.5521 2.14509 11.5059 1.75 12.5005 1.75C13.495 1.75 14.4489 2.14509 15.1521 2.84835C15.8554 3.55161 16.2505 4.50544 16.2505 5.5V6.515C17.5375 6.554 18.3255 6.692 18.9265 7.191C19.7595 7.883 19.9795 9.053 20.4185 11.394L21.1685 15.394C21.7855 18.686 22.0935 20.332 21.1945 21.416C20.2945 22.5 18.6195 22.5 15.2705 22.5H9.73048C6.38048 22.5 4.70648 22.5 3.80648 21.416C2.90648 20.332 3.21648 18.686 3.83248 15.394L4.58248 11.394C5.02248 9.054 5.24148 7.883 6.07448 7.191C6.67548 6.692 7.46348 6.554 8.75048 6.515ZM10.2505 5.5C10.2505 4.90326 10.4875 4.33097 10.9095 3.90901C11.3314 3.48705 11.9037 3.25 12.5005 3.25C13.0972 3.25 13.6695 3.48705 14.0915 3.90901C14.5134 4.33097 14.7505 4.90326 14.7505 5.5V6.5H10.2505V5.5Z"
    //           fill="#4C3225"
    //         />
    //       </svg>
    //       <span>panier</span>
    //     </Link>
    //   </div>
    // </header>
    <></>
  )
}
