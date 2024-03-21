import { Token } from 'components'
import { observer } from 'mobx-react-lite'
import { StyledVotedList, Player, PlayerVotedName } from './VotedList.styles'
import { VotedListProps } from './VotedList.types'

export const VotedList: React.FC<VotedListProps> = observer(({ players }) => (
  <StyledVotedList>
    {players.map(({ player_name, voted, player_number }, index) => {
      const playerTokenName = voted
        ? `selected_${player_number}`
        : player_number
      return (
        <Player key={index}>
          <Token tokenName={playerTokenName} size={25} ready={voted} />
          <PlayerVotedName voted={voted}>
            {player_name} is {voted ? 'voted' : 'not voted'}
          </PlayerVotedName>
        </Player>
      )
    })}
  </StyledVotedList>
))
