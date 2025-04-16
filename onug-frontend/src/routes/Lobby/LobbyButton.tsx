import { observer } from 'mobx-react-lite'
import { StyledLobbyButton } from './Lobby.styles'
import { StyledLobbyProps } from './Lobby.types'

export const LobbyButton: React.ComponentType<StyledLobbyProps> = observer(({ buttonText, onClick, img }) => {
  const testId = buttonText.replace(/ /g, '-')

  return (
    <StyledLobbyButton onClick={onClick} data-testid={testId} img={img}>
      {buttonText}
    </StyledLobbyButton>
  )
})
