import { Button, ButtonGroup, Footer } from 'components'
import { button_label_back } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'

export const VerdictFooter: React.FC = observer(() => {
  const { handleLeaveGame } = useClickHandler()

  return (
    <Footer>
      <ButtonGroup>
        <Button onClick={handleLeaveGame} buttonText={button_label_back} variant="green" />
      </ButtonGroup>
    </Footer>
  )
})
