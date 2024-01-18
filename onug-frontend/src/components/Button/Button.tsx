import { observer } from 'mobx-react-lite'
import { StyledButton } from './Button.styles'
import { ButtonProps } from './Button.types'

export const Button: React.FC<ButtonProps> = observer(
  ({ backgroundColor, buttontext, onClick, disabled }) => {
    const testId = buttontext.replace(/ /g, '-')

    return (
      <StyledButton
        onClick={onClick}
        backgroundColor={backgroundColor}
        disabled={disabled}
        data-testid={testId}
      >
        {buttontext}
      </StyledButton>
    )
  }
)
