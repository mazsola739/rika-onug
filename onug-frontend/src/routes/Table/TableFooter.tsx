import { Footer, FooterButtons, Button } from "components"
import { BUTTONS } from "constant"
import { useClickHandler } from "hooks"
import { observer } from "mobx-react-lite"
import { gameBoardStore } from "store"

export const TableFooter: React.FC = observer(() => {
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const { handleLeaveTable, handleStartGame, handleReady } = useClickHandler(room_id, token)
  const { player, players } = gameBoardStore
  
  const ready = players?.find(actualPlayer => actualPlayer.player_number === `player_${player.player_number}`).ready

  return (
    <Footer>
      <FooterButtons>
        <Button onClick={handleLeaveTable} buttonText={BUTTONS.stop_button_label} variant="red" />
        <Button onClick={handleStartGame} buttonText={BUTTONS.start_game_label} variant="purple" />
        <Button onClick={handleReady} variant="green" buttonText={ ready ? BUTTONS.im_ready_label : BUTTONS.ready_label } />
      </FooterButtons>
    </Footer>
  )
})
