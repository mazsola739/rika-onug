import { observer } from 'mobx-react-lite'
import { Icon } from 'components'
import { IconType } from 'components/Icon/Icon.types'
import { Message, SendButton, StyledMessageBox } from './MessageBox.styles'

import { interactionStore } from 'store'

export const MessageBox: React.FC = observer(() => {
  const iconName = interactionStore.messageIcon as IconType
  const message = interactionStore.getMessage()

  console.log(message)

  return (
    <StyledMessageBox>
      <Message>{message}</Message>
      <SendButton>
        {iconName.length > 0 && <Icon iconName={iconName} size={50} />}
      </SendButton>
    </StyledMessageBox>
  )
})
