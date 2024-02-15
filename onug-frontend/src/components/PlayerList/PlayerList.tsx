import { observer } from 'mobx-react-lite'
import { Player, PlayerReadyName, StyledPlayerList } from './PlayerList.styles'
import { PlayerListProps } from './PlayerList.types'
import { Token } from 'components/Token/Token'

export const PlayerList: React.FC<PlayerListProps> = observer(({ players }) => (
  <StyledPlayerList>
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
  </StyledPlayerList>
))
