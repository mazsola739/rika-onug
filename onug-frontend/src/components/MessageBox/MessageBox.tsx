import { observer } from 'mobx-react-lite'
import { Button, Icon } from 'components'
import { IconType } from 'components/Icon/Icon.types'
import { Buttons, Instructions, Message, RoleInteractionIcon, StyledMessageBox } from './MessageBox.styles'
import { gameBoardStore, interactionStore } from 'store'
import { useClickHandler } from 'hooks'

export const MessageBox: React.FC = observer(() => {
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')
  const { handleAnswerInteraction } = useClickHandler(room_id, token)
  const iconName = interactionStore.messageIcon as IconType
  const message = interactionStore.getMessage()
  const answerOptions = gameBoardStore.answerOptions

  return (
    <StyledMessageBox>
      <Instructions>
        <Message>{message}</Message>
        {answerOptions.length > 0 && (
          <Buttons>
            {answerOptions.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerInteraction(option)}
                variant="magenta"
                buttonText={option}
              />
            ))}
          </Buttons>
        )}
      </Instructions>
      <RoleInteractionIcon>
        {iconName.length > 0 && <Icon iconName={iconName} size={50} />}
      </RoleInteractionIcon>
    </StyledMessageBox>
  )
})
