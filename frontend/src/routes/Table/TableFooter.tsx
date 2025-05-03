import { ButtonGroup, Button } from 'components'
import { button_label_back, button_label_start, button_label_im_ready, button_label_ready } from 'constants'
import { useClickHandler } from 'hooks'
import { Footer } from 'layouts'
import { observer } from 'mobx-react-lite'
import { playersStore } from 'store'

export const TableFooter: React.ComponentType = observer(() => {
  const { handleLeaveGame, handleStartGame, handleReady } = useClickHandler()
  const { players } = playersStore

  const isReady = playersStore.isPlayerReady
  const disabled = players.some(player => player.flag === false)

  return (
    <Footer>
      <ButtonGroup>
        <Button onClick={handleLeaveGame} buttonText={button_label_back} variant='red' />
        <Button onClick={handleStartGame} buttonText={button_label_start} variant='purple' disabled={disabled} />
        <Button onClick={handleReady} variant={isReady ? 'blue' : 'green'} buttonText={isReady ? button_label_im_ready : button_label_ready} />
      </ButtonGroup>
    </Footer>
  )
})
