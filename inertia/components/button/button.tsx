import { twMerge } from 'tailwind-merge'

interface ButtonProps {
  text: string
  type: 'submit' | 'button' | 'reset'
  variant?: 'primary' | 'secondary'
}

export const Button = ({ text, type, variant = 'primary' }: ButtonProps) => {
  const cummonStyle = 'btn cursor-pointer w-full text-base px-8 py-4.5'
  return variant === 'primary' ? (
    <button type={type} className={twMerge(cummonStyle, 'text-white bg-accent')}>
      {text}
    </button>
  ) : (
    <button type={type} className={twMerge(cummonStyle, 'text-primary bg-white')}>
      {text}
    </button>
  )
}
