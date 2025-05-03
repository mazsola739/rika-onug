import { observer } from 'mobx-react-lite'
import { InputFieldProps } from './InputField.types'
import { Input, StyledInputField } from './InputField.styles'
import { Label } from 'routes/God/God.styles'

//TODO react yup for form?
export const InputField: React.ComponentType<InputFieldProps> = observer(({ label, type = 'text', name, placeholder, value, onChange, required }) => (
  <StyledInputField>
    <Label>{label}</Label>
    <Input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      maxLength={20}
      pattern='[a-zA-Z0-9]*'
      title='Nickname can only contain letters and numbers, and must be 20 characters or fewer.'
    />
  </StyledInputField>
))
