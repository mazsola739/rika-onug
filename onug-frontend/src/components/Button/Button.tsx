import { StyledButton } from './Button.styles'
import { ButtonProps } from './Button.types'

export const Button = ({
  backgroundColor,
  buttontext,
  onClick,
  disabled,
}: ButtonProps) => (
  <StyledButton
    onClick={onClick}
    backgroundColor={backgroundColor}
    disabled={disabled}
  >
    {buttontext}
  </StyledButton>
)
