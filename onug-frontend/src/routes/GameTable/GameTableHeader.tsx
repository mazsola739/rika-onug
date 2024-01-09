import { Button, Header } from 'components'
import { observer } from 'mobx-react-lite'
import {
  CardInformation,
  Player,
  PlayerInfo,
  StyledGameTableHeader,
  YourAvatar,
  YourCard,
  YourCardRule,
  YourName,
} from './GameTable.styles'
import { RoomHeaderProps } from './GameTable.types'
import { sendReadyRequest } from 'api'

export const GameTableHeader = observer(({ player }: RoomHeaderProps) => {
  const handleClick = async () => {
    try {
      const responseData = await sendReadyRequest()
      console.log('Response from backend:', responseData)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <Header>
      <StyledGameTableHeader>
        <CardInformation>
          <YourCard
            src={require(
              `../../assets/cards/${player.player_card.card_name}.png`
            )}
            alt={player.player_card.display_name}
          />
          <YourCardRule>{`${player.player_card.display_name}: ${player.player_card.rules}`}</YourCardRule>
        </CardInformation>
        <PlayerInfo>
          <YourAvatar
            src={require(
              `../../assets/players/selected_player_${player.player_number}.png`
            )}
            alt={player.player_name}
          />
          <Player>
            <YourName>{player.player_name}</YourName>
            <Button
              onClick={handleClick}
              backgroundColor="#28a745"
              buttontext="Ready?"
            />
          </Player>
        </PlayerInfo>
      </StyledGameTableHeader>
    </Header>
  )
})
