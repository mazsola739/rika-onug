export interface InputFieldProps {
  label: string
  type: string
  name: string
  placeholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  required: boolean
}
