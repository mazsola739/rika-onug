import { Button, ButtonGroup, Footer } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { useVerdict } from './useVerdict'

export const VerdictFooter: React.FC = observer(() => {
  const { handleLeaveGame, handleVoteNow } = useClickHandler()
  const { disabled } = useVerdict()

  return (
    <Footer>
      <ButtonGroup>
        <Button onClick={handleLeaveGame} buttonText={BUTTONS.leave_table_label} variant="red" />
        <Button onClick={handleVoteNow} buttonText={BUTTONS.votenow_button_label} disabled={disabled} variant="orange" />
      </ButtonGroup>
    </Footer>
  )
})
