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
import { utils } from 'utils'
import { deckStore, wsStore } from 'store'
import { READY } from 'constant'

export const GameTableHeader: React.FC = observer(() => {
  const { sendJsonMessage } = wsStore.getWsCommunicationsBridge()
  const { findCardById } = utils

  const token = sessionStorage.getItem('token')
  const room_id = sessionStorage.getItem('room_id')
  const player_name = sessionStorage.getItem('player_name')
  const player_number = sessionStorage.getItem('player_number')
  const player_card_id = sessionStorage.getItem('player_card_id')

  const player = {
    player_card: findCardById(deckStore.deck, +player_card_id),
    player_name,
    player_number: +player_number,
  }

  const handleClick = async () => {
    sendJsonMessage({
      type: READY,
      token,
      room_id,
    })
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
