interface ButtonProps {
  text: string
  type: 'submit' | 'button' | 'reset'
  variant?: 'primary' | 'secondary'
}

export const Button = ({ text, type, variant = 'primary' }: ButtonProps) => {
  return variant === 'primary' ? (
    <button
      type={type}
      className="btn cursor-pointer bg-primary w-fit text-white text-lg px-10 py-6"
    >
      {text}
    </button>
  ) : (
    <button
      type={type}
      className="btn cursor-pointer bg-white text-primary w-fit text-lg px-10 py-6"
    >
      {text}
    </button>
  )
}
