import { ButtonGroup, Button } from 'components'
import { button_label_back } from 'constants'
import { useClickHandler } from 'hooks'
import { Footer } from 'layouts'
import { observer } from 'mobx-react-lite'

export const VerdictFooter: React.ComponentType = observer(() => {
  const { handleLeaveGame } = useClickHandler()

  return (
    <Footer>
      <ButtonGroup>
        <Button onClick={handleLeaveGame} buttonText={button_label_back} variant='green' />
      </ButtonGroup>
    </Footer>
  )
})
