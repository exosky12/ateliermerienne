export const Socials = () => {
  return (
    <div className={'flex w-full flex-col gap-2'}>
      <a
        href={'/auth/facebook'}
        className={
          'btn cursor-pointer bg-[#1877F2] text-white py-5 px-4 font-bold flex gap-2 items-center justify-center'
        }
      >
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" transform="translate(0.5)" fill="#1877F2" />
          <path
            d="M24 12.0699C24 5.7186 18.8513 0.56988 12.5 0.56988C6.14872 0.56988 1 5.7186 1 12.0699C1 17.8099 5.20538 22.5674 10.7031 23.4302V15.3941H7.7832V12.0699H10.7031V9.53629C10.7031 6.6541 12.42 5.06207 15.0468 5.06207C16.305 5.06207 17.6211 5.28668 17.6211 5.28668V8.11675H16.171C14.7424 8.11675 14.2969 9.00322 14.2969 9.91266V12.0699H17.4863L16.9765 15.3941H14.2969V23.4302C19.7946 22.5674 24 17.8099 24 12.0699Z"
            fill="white"
          />
        </svg>
        Continuer avec Facebook
      </a>
      <a
        href={'/auth/google'}
        className={
          'btn cursor-pointer bg-white text-black py-5 px-4 font-bold flex gap-2 items-center justify-center'
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
    </div>
  )
}
