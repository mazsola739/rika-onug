import { Token } from 'components'
import { observer } from 'mobx-react-lite'
import { Ready, ReadyInfo, StyledReadyList } from './ReadyList.styles'
import { ReadyListProps } from './ReadyList.types'

export const ReadyList: React.FC<ReadyListProps> = observer(({ players }) => (
  <StyledReadyList>
    {players.map(({ player_name, flag: ready, player_number }, index) => {
      const playerTokenName = ready ? `selected_${player_number}` : player_number
      return (
        <ReadyInfo key={index}>
          <Token tokenName={playerTokenName} size={25} ready={ready} />
          <Ready ready={ready}>
            {player_name} is {ready ? 'ready' : 'not ready'}
          </Ready>
        </ReadyInfo>
      )
    })}
  </StyledReadyList>
))
