import { observer } from 'mobx-react-lite'
import { StyledButton } from './Button.styles'
import { ButtonProps } from './Button.types'

export const Button: React.FC<ButtonProps> = observer(({ variant, buttonText, onClick, disabled }) => (
  <StyledButton onClick={onClick} variant={variant} disabled={disabled}>
    {buttonText}
  </StyledButton>
))
