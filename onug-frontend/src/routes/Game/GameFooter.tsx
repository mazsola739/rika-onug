import { Button, ButtonGroup, Footer } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { gameStatusStore } from 'store'

export const GameFooter: React.FC = observer(() => {
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const { handlePauseGame, handleStopGame } = useClickHandler(room_id, token)

  const buttonText = gameStatusStore.isGamePlayPaused ? BUTTONS.pause_button_alt_label : BUTTONS.pause_button_label

  return (
    <Footer>
      <ButtonGroup>
        <Button onClick={handlePauseGame} buttonText={buttonText} variant="orange" />
        <Button onClick={handleStopGame} buttonText={BUTTONS.stop_button_label} variant="red" />
      </ButtonGroup>
    </Footer>
  )
})
