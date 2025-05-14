import { twMerge } from 'tailwind-merge'

interface ButtonProps {
  text: string
  type: 'submit' | 'button' | 'reset'
  variant?: 'primary' | 'secondary'
}

export const Button = ({ text, type, variant = 'primary' }: ButtonProps) => {
  const cummonStyle = 'btn cursor-pointer w-fit text-lg px-6 py-5 sm:px-10 sm:py-6'
  return variant === 'primary' ? (
    <button type={type} className={twMerge(cummonStyle, 'text-white bg-primary')}>
      {text}
    </button>
  ) : (
    <button type={type} className={twMerge(cummonStyle, 'text-primary bg-white')}>
      {text}
    </button>
  )
}
