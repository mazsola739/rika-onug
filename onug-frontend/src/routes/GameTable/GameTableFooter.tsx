import { Footer, FooterButtons, Button } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'

export const GameTableFooter: React.FC = observer(() => {
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const { handleLeaveTable, handleStartGame, handleReady } = useClickHandler(
    room_id,
    token
  )

  return (
    <Footer>
      <FooterButtons>
        <Button onClick={handleLeaveTable} buttonText={BUTTONS.stop_button_label} variant="red" />
        <Button onClick={handleStartGame} buttonText={BUTTONS.start_game_label} variant="purple" />
        <Button onClick={handleReady} variant="green" buttonText={   /* ready ? buttons.im_ready_label :  */ BUTTONS.ready_label } />
      </FooterButtons>
    </Footer>
  )
})
