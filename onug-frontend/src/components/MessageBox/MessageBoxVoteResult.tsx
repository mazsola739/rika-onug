import { TokenImage } from 'components'
import { observer } from 'mobx-react-lite'
import { formatPositionSimply } from 'utils'
import { StyledMessageBoxVoteResult, PlayerPosition } from './MessageBox.styles'
import { VoteResultProps } from './MessageBox.types'

export const MessageBoxVoteResult: React.FC<VoteResultProps> = observer(({ votes }) => {
  return (
    <StyledMessageBoxVoteResult>
      {Object.entries(votes).map(([key, values]) => (
        <div key={key}>
          <PlayerPosition>{formatPositionSimply(key)}</PlayerPosition>
          {values.map(value => (
            <TokenImage key={value} image={value} size={30} />
          ))}
        </div>
      ))}
    </StyledMessageBoxVoteResult>
  )
})
