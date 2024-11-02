import { Button, ButtonGroup, Footer } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'

export const VoteFooter: React.FC = observer(() => {
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const { handleVoteNow } = useClickHandler(room_id, token)

  return (
    <Footer>
      <ButtonGroup>
        <Button onClick={handleVoteNow} buttonText={BUTTONS.votenow_button_label} variant='orange' />
      </ButtonGroup>
    </Footer>
  )
})
