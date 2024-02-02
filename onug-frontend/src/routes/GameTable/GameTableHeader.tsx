import { CardImage, Header, Token } from 'components'
import { observer } from 'mobx-react-lite'
import { playerStore } from 'store'
import {
  PlayerCardInfo,
  PlayerCardRule,
  PlayerInfo,
  PlayerName,
  StyledGameTableHeader,
} from './GameTable.styles'

export const GameTableHeader: React.FC = observer(() => {
  const { player } = playerStore

  //Todo wining condition
  //TODO Add role tokens

  return (
    <Header>
      {player && (
        <StyledGameTableHeader>
          <PlayerInfo>
            <Token
              tokenName={`selected_player_${player.player_number}`}
              size={50}
            />
            <PlayerName>{player.player_name}</PlayerName>
          </PlayerInfo>
          <PlayerCardInfo>
            <CardImage image={player.player_card.card_name} size={100} />
            <PlayerCardRule>
              {`${player.player_card.display_name}: ${player.player_card.rules}`}
            </PlayerCardRule>
          </PlayerCardInfo>
        </StyledGameTableHeader>
      )}
    </Header>
  )
})
