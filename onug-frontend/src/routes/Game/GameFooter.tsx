import { Footer, FooterButtons, Button } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { gameStore } from 'store'

export const GameFooter: React.FC = observer(() => {
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')
  const buttonText = gameStore.isGamePaused
    ? BUTTONS.pause_button_alt_label
    : BUTTONS.pause_button_label

  const { handlePauseGame, handleStopGame } = useClickHandler(room_id, token)

  return (
    <Footer>
      <FooterButtons>
        <Button onClick={handlePauseGame} buttonText={buttonText}variant="orange" />
        <Button onClick={handleStopGame} buttonText={BUTTONS.stop_button_label}variant="red" />
      </FooterButtons>
    </Footer>
  )
})
