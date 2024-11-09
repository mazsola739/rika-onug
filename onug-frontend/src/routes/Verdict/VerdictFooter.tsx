import { Button, ButtonGroup, Footer } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'

export const VerdictFooter: React.FC = observer(() => {
  const { handleLeaveGame } = useClickHandler()

  return (
    <Footer>
      <ButtonGroup>
        <Button onClick={handleLeaveGame} buttonText={BUTTONS.back_label} variant="green" />
      </ButtonGroup>
    </Footer>
  )
})
