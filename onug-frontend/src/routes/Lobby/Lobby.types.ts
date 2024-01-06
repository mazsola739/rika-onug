import LobbyStore from 'store/LobbyStore'

export interface LobbyProps {
  lobbyStore: LobbyStore
}

export interface StyledLobbyProps {
  index: number
  buttonText?: string
  onClick: () => void
}

export interface PropsNoName {
  color: string
}
