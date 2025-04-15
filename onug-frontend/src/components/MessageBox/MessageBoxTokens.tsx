import { TokenImage } from 'components'
import { observer } from 'mobx-react-lite'
import { StyledMessageBoxCards, MessageBoxItem, ItemPosition } from './MessageBox.styles'
import { MessageTokensProps } from './MessageBox.types'

export const MessageBoxTokens: React.FC<MessageTokensProps> = observer(({ players }) => {
  return (
    <StyledMessageBoxCards>
      {players.map((player, index) => (
        <MessageBoxItem key={index}>
          <TokenImage image={player.position} size={40} />
          <ItemPosition>{player.name}</ItemPosition>
        </MessageBoxItem>
      ))}
    </StyledMessageBoxCards>
  )
})
