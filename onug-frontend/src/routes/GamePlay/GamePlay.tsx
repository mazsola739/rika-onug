import { observer } from 'mobx-react-lite'
import { StyledGamePlay } from './GamePlay.styles'
import { gamePlayStore, selectedDeckStore } from 'store'
import { Button, Footer, FooterButtons, Header } from 'components'
import { buttons } from 'constant'
import { useCallback } from 'react'
import { GamePlayHeader } from './GamePlayHeader'
import { useNavigate } from 'react-router-dom'

export const GamePlay: React.FC = observer(() => {
  const navigate = useNavigate()
  const room_id = sessionStorage.getItem('room_id')
  const everyone = gamePlayStore.generateActions()

  const handlePauseGame = useCallback(() => {
    gamePlayStore.togglePauseStatus()
  }, [])

  const handleStopGame = useCallback(() => {
    navigate(`/room/${room_id}`)
  }, [selectedDeckStore])

  const buttonText = gamePlayStore.isGamePaused
    ? buttons.pause_button_alt_label
    : buttons.pause_button_label

  return (
    <>
      <Header>
        <GamePlayHeader />
      </Header>
      <StyledGamePlay>
        <pre>
          {`    ${everyone.map((card) => card.text).join(`   
    `)}`}
        </pre>
      </StyledGamePlay>
      <Footer>
        <FooterButtons>
          <Button
            onClick={handlePauseGame}
            buttontext={buttonText}
            backgroundColor="#ff9800"
          />
          <Button
            onClick={handleStopGame}
            buttontext={buttons.stop_button_label}
            backgroundColor="#f44336"
          />
        </FooterButtons>
      </Footer>
    </>
  )
})
