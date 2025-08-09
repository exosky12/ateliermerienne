export const Socials = () => {
  return (
    <div className={'flex w-full gap-3'}>
      <a
        href={'/auth/google'}
        className={
          'cursor-pointer font-normal rounded-2xl border-2 border-strokeGrey w-full bg-white decoration-none text-black text-[14px] py-5 px-4 font-bold flex gap-3 items-center justify-center'
        }
      >
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" transform="translate(0.5)" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.54 12.2615C23.54 11.446 23.4668 10.6619 23.3309 9.90918H12.5V14.3576H18.6891C18.4225 15.7951 17.6123 17.013 16.3943 17.8285V20.714H20.1109C22.2855 18.7119 23.54 15.7637 23.54 12.2615Z"
            fill="#4285F4"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.4995 23.5001C15.6045 23.5001 18.2077 22.4703 20.1104 20.7139L16.3938 17.8285C15.364 18.5185 14.0467 18.9262 12.4995 18.9262C9.50425 18.9262 6.96902 16.9032 6.0647 14.1851H2.22266V17.1646C4.11493 20.923 8.00402 23.5001 12.4995 23.5001Z"
            fill="#34A853"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.06523 14.185C5.83523 13.495 5.70455 12.7579 5.70455 12C5.70455 11.242 5.83523 10.505 6.06523 9.81499V6.83545H2.22318C1.44432 8.38795 1 10.1443 1 12C1 13.8557 1.44432 15.612 2.22318 17.1645L6.06523 14.185Z"
            fill="#FBBC05"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.4995 5.07386C14.1879 5.07386 15.7038 5.65409 16.8956 6.79364L20.194 3.49523C18.2024 1.63955 15.5992 0.5 12.4995 0.5C8.00402 0.5 4.11493 3.07705 2.22266 6.83545L6.0647 9.815C6.96902 7.09682 9.50425 5.07386 12.4995 5.07386Z"
            fill="#EA4335"
          />
        </svg>
        Continuer avec Google
      </a>
      <a
        href={'/auth/facebook'}
        className={
          'cursor-pointer font-normal rounded-2xl border-2 border-strokeGrey w-full bg-white decoration-none text-black text-[14px] py-5 px-4 font-bold flex gap-3 items-center justify-center'
        }
      >
        <svg
          width="24"
          height="23"
          viewBox="0 0 24 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.5 11.5698C23.5 5.21857 18.3513 0.069849 12 0.069849C5.64872 0.069849 0.5 5.21857 0.5 11.5698C0.5 17.3098 4.70538 22.0674 10.2031 22.9301V14.8941H7.2832V11.5698H10.2031V9.03626C10.2031 6.15407 11.92 4.56204 14.5468 4.56204C15.805 4.56204 17.1211 4.78665 17.1211 4.78665V7.61672H15.671C14.2424 7.61672 13.7969 8.50319 13.7969 9.41263V11.5698H16.9863L16.4765 14.8941H13.7969V22.9301C19.2946 22.0674 23.5 17.3098 23.5 11.5698Z"
            fill="#1877F2"
          />
        </svg>
        Continuer avec Facebook
      </a>
    </div>
  )
}
