import { Button, ButtonGroup, Footer } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { playersStore } from 'store'

export const VerdictFooter: React.FC = observer(() => {
  const { handleLeaveGame, handleVoteNow } = useClickHandler()

  const { players } = playersStore
  const disabled = players.some(player => player.flag === false)

  return (
    <Footer>
        <ButtonGroup>
          <Button onClick={handleLeaveGame} buttonText={BUTTONS.leave_table_label} variant="red" />
          <Button onClick={handleVoteNow} buttonText={BUTTONS.votenow_button_label} disabled={disabled} variant="orange" />
        </ButtonGroup>
    </Footer>
  )
})
