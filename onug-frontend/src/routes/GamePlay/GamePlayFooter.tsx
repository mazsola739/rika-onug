import { observer } from 'mobx-react-lite'
import { gamePlayStore } from 'store'
import { Button, Footer, FooterButtons } from 'components'
import { buttons } from 'constant'
import { useClickHandler } from 'hooks'

export const GamePlayFooter: React.FC = observer(() => {
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')
  const buttonText = gamePlayStore.isGamePaused
    ? buttons.pause_button_alt_label
    : buttons.pause_button_label

  const { handlePauseGame, handleStopGame } = useClickHandler(room_id, token)

  return (
    <Footer>
      <FooterButtons>
        <Button onClick={handlePauseGame} buttonText={buttonText}variant="orange" />
        <Button onClick={handleStopGame} buttonText={buttons.stop_button_label}variant="red" />
      </FooterButtons>
    </Footer>
  )
})
