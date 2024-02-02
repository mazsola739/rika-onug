import { Header, Token } from 'components'
import { observer } from 'mobx-react-lite'
import { playerStore } from 'store'
import {
  PlayerCard,
  PlayerCardInformation,
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
          <PlayerCardInformation>
            <PlayerCard
              src={`/assets/cards/${player.player_card.card_name}.png`}
              alt={player.player_card.display_name}
            />
            <PlayerCardRule>
              {`${player.player_card.display_name}: ${player.player_card.rules}`}
            </PlayerCardRule>
          </PlayerCardInformation>
        </StyledGameTableHeader>
      )}
    </Header>
  )
})
