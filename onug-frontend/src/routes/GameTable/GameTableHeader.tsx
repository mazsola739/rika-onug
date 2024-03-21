import { Header, Token, CardImage } from 'components'
import { observer } from 'mobx-react-lite'
import { deckStore } from 'store'
import { StyledGameTableHeader, PlayerInfo, PlayerName, PlayerCardInfo, PlayerCardRule } from './GameTable.styles'
import { GameTableHeaderProp } from './GameTable.types'

export const GameTableHeader: React.FC<GameTableHeaderProp> = observer(
  ({ player }) => {
    const card = player?.player_card_id
      ? deckStore.getCardById(player.player_card_id)
      : null
    //Todo wining condition
    //TODO Add mark

    return (
      <Header>
        {player && (
          <StyledGameTableHeader>
            <PlayerInfo>
              <Token tokenName={`selected_player_${player.player_number}`} size={50} />
              <PlayerName>{player.player_name}</PlayerName>
            </PlayerInfo>
            <PlayerCardInfo>
              <CardImage image={card.card_name} size={100} />
              <PlayerCardRule>{`${player.player_role}: ${card.rules}`}</PlayerCardRule>
            </PlayerCardInfo>
          </StyledGameTableHeader>
        )}
      </Header>
    )
  }
)
