import { Title } from 'components'
import { observer } from 'mobx-react-lite'
import { StyledSelectable } from './MessageBox.styles'
import { LookProps } from './MessageBox.types'
import { MessageBoxTokens } from './MessageBoxTokens'

export const Look: React.FC<LookProps> = observer(({ roles, players }) => {
  return (
    <StyledSelectable>
      <Title title={roles.join(', ')} />
      <MessageBoxTokens players={players} />
    </StyledSelectable>
  )
})
