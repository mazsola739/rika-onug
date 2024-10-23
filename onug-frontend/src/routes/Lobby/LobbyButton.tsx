import { StyledLobbyButton } from "./Lobby.styles"
import { StyledLobbyProps } from "./Lobby.types"

export const LobbyButton: React.FC<StyledLobbyProps> = ({ buttonText, onClick, img }) => {
    const testId = buttonText.replace(/ /g, '-')
  
    return (
      <StyledLobbyButton onClick={onClick} data-testid={testId} img={img}>
        {buttonText}
      </StyledLobbyButton>
    )
  }
  