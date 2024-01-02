import { Button, Header } from 'components'
import { identifier_player } from 'constant'
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
import { cards } from 'data'

export const RoomHeader = observer(() => {
  const card = cards[0]
  const playerName = identifier_player.identifier_player1_text

  const handleClick = () => {
    console.log('Im ready')
  }

  return (
    <Header>
      <StyledRoomHeader>
        <CardInformation>
          <YourCard
            src={require(`../../assets/cards/${card.card_name}.png`)}
            alt={card.card_name}
          />
          <YourCardRule>{`${card.display_name}: ${card.rules}`}</YourCardRule>
        </CardInformation>
        <PlayerInfo>
          <YourAvatar
            src={require(`../../assets/players/selected_player_1.png`)}
            alt={`${playerName}`}
          />
          <Player>
            <YourName>{playerName}</YourName>
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
