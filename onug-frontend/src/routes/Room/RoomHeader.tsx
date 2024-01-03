import { Button, Header } from 'components'
import { observer } from 'mobx-react-lite'
import {
  CardInformation,
  Player,
  PlayerInfo,
  StyledRoomHeader,
  YourAvatar,
  YourCard,
  YourCardRule,
  YourName,
} from './Room.styles'
import { RoomHeaderProps } from './Room.types'

export const RoomHeader = observer(({ player }: RoomHeaderProps) => {
  const handleClick = () => {
    console.log('Im ready')
  }

  return (
    <Header>
      <StyledRoomHeader>
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
      </StyledRoomHeader>
    </Header>
  )
})
