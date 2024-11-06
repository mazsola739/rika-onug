import { Button, ButtonGroup, Footer } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { playersStore } from 'store'

export const TableFooter: React.FC = observer(() => {
  const { handleLeaveGame, handleStartGame, handleReady } = useClickHandler()

  const isReady = playersStore.isPlayerReady

  return (
    <Footer>
      <ButtonGroup>
        <Button onClick={handleLeaveGame} buttonText={BUTTONS.leave_table_label} variant="red" />
        <Button onClick={handleStartGame} buttonText={BUTTONS.start_game_label} variant="purple" />
        <Button onClick={handleReady} variant={isReady ? 'blue' : 'green'} buttonText={isReady ? BUTTONS.im_ready_label : BUTTONS.ready_label} />
      </ButtonGroup>
    </Footer>
  )
})
