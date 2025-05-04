import { observer } from 'mobx-react-lite'
import { InputFieldProps } from './InputField.types'
import { Input, StyledInputField } from './InputField.styles'
import { Label } from 'routes/God/God.styles'

//TODO react yup for form?
export const InputField: React.ComponentType<InputFieldProps> = observer(({ label, type = 'text', name, placeholder, value, onChange, required, maxLength, pattern, title }) => (
  <StyledInputField>
    {label && <Label>{label}</Label>}
    <Input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      maxLength={maxLength}
      pattern={pattern}
      title={title}
    />
  </StyledInputField>
))
