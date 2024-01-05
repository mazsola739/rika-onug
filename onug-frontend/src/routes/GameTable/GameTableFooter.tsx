import { Button, Footer, FooterButtons, LinkButton } from 'components'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import { buttons } from 'constant'
import { gamePlayStore, selectedDeckStore } from 'store'
import { Messages } from './GameTable.styles'

export const GameTableFooter = observer(() => {
  const handlePauseGame = useCallback(() => {
    gamePlayStore.togglePauseStatus()
  }, [])

  const handleStopGame = useCallback(() => {
    gamePlayStore.toggleGameStatus()
  }, [selectedDeckStore])

  const handleStartGame = useCallback(() => {
    console.log('Game started', buttons.start_button_label)
  }, [])

  const buttonText = gamePlayStore.isGamePaused
    ? buttons.pause_button_alt_label
    : buttons.pause_button_label

  return (
    <Footer>
      <FooterButtons>
        <Button
          onClick={handlePauseGame}
          buttontext={buttonText}
          backgroundColor="#ff9800"
        />
        <LinkButton
          linkTo="/"
          onClick={handleStopGame}
          buttontext={buttons.stop_button_label}
          backgroundColor="#f44336"
        />
        <LinkButton
          linkTo="/gameplay"
          onClick={handleStartGame}
          buttontext={buttons.start_game_label}
          backgroundColor="#8e44ad"
        />
      </FooterButtons>
      <Messages>Player 1 logged in</Messages>
      <br />
      <Messages>Player 2 ready</Messages>
    </Footer>
  )
})
