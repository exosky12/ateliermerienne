type InputPropsType = {
  type?: string
  placeholder?: string
  id?: string
}

export const Input = ({ type, placeholder, id }: InputPropsType) => {
  return (
    <input
      type={type || 'text'}
      name={type || 'text'}
      id={id || type || 'text'}
      className="rounded-2xl border-2 border-solid border-strokeGrey p-4"
      placeholder={placeholder || 'Entrez votre texte ici'}
    />
  )
}
