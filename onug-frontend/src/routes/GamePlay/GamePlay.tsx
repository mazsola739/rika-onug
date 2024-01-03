import { observer } from 'mobx-react-lite'
import { StyledGamePlay } from './GamePlay.styles'
import { gamePlayStore, selectedDeckStore } from 'store'
import { Footer, FooterButtons, Header, LinkButton } from 'components'
import { buttons } from 'constant'
import { useCallback } from 'react'

export const GamePlay = observer(() => {
  const everyone = gamePlayStore.generateActions()

  const handleStopGame = useCallback(() => {
    gamePlayStore.toggleGameStatus()
  }, [selectedDeckStore])

  return (
    <>
      <Header>
        <p>header</p>
      </Header>
      <StyledGamePlay>
        <pre>
          {`    ${everyone.map((card) => card.text).join(`   
    `)}`}
        </pre>
      </StyledGamePlay>
      <Footer>
        <FooterButtons>
          <LinkButton
            linkTo="/"
            onClick={handleStopGame}
            buttontext={buttons.stop_button_label}
            backgroundColor="#f44336"
          />
        </FooterButtons>
      </Footer>
    </>
  )
})
