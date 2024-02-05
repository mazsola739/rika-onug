import { Button, Footer, FooterButtons } from 'components'
import { observer } from 'mobx-react-lite'
import { buttons } from 'constant'
import { useClickHandler } from 'hooks'

export const GameTableFooter: React.FC = observer(() => {
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const { handleLeaveTable, handleStartGame, handleReady, ready } =
    useClickHandler(room_id, token)

  return (
    <Footer>
      <FooterButtons>
        <Button
          onClick={handleLeaveTable}
          buttonText={buttons.stop_button_label}
          variant="red"
        />
        <Button
          onClick={handleStartGame}
          buttonText={buttons.start_game_label}
          variant="purple"
        />
        <Button
          onClick={handleReady}
          variant="green"
          buttonText={ready ? buttons.im_ready_label : buttons.ready_label}
        />
      </FooterButtons>
    </Footer>
  )
})
