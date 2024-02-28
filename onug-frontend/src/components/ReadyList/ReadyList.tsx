import { observer } from 'mobx-react-lite'
import { Player, PlayerReadyName, StyledReadyList } from './ReadyList.styles'
import { ReadyListProps } from './ReadyList.types'
import { Token } from 'components/Token/Token'

export const ReadyList: React.FC<ReadyListProps> = observer(({ players }) => (
  <StyledReadyList>
    {players.map(({ player_name, ready, player_number }, index) => {
      const playerTokenName = ready
        ? `selected_${player_number}`
        : player_number
      return (
        <Player key={index}>
          <Token tokenName={playerTokenName} size={25} ready={ready} />
          <PlayerReadyName ready={ready}>
            {player_name} is {ready ? 'ready' : 'not ready'}
          </PlayerReadyName>
        </Player>
      )
    })}
  </StyledReadyList>
))
