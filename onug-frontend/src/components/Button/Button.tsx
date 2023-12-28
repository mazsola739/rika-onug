import { StyledButton } from './Button.styles'
import { ButtonProps } from './Button.types'

export const Button = ({
  backgroundColor,
  buttontext,
  onClick,
}: ButtonProps) => (
  <StyledButton onClick={onClick} backgroundColor={backgroundColor}>
    {buttontext}
  </StyledButton>
)
