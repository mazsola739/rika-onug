import { observer } from 'mobx-react-lite'
import { StyledGamePlay } from './GamePlay.styles'
import { gamePlayStore, selectedDeckStore } from 'store'
import { Footer, FooterButtons, Header, LinkButton } from 'components'
import { buttons } from 'constant'
import { useCallback } from 'react'
import { GamePlayHeader } from './GamePlayHeader'
/* import { useEffect, useState } from 'react'
import { useTimer } from 'hooks/useTimer' */

export const GamePlay = observer(() => {
  const everyone = gamePlayStore.generateActions()

  const handleStopGame = useCallback(() => {
    gamePlayStore.toggleGameStatus()
  }, [selectedDeckStore])

  /*  const [everyone, setEveryone] = useState([{ text: '', time: 1 }])
  const [booleanChoiceVisible, setBooleanChoiceVisible] = useState(false)
  const [actualActionIndex, setActualActionIndex] = useState(0)
  const [paused, setPause, setResume, startTimer] = useTimer()

  const up = () => {
    console.log(
      `+1 act action index from [${actualActionIndex}] to [${
        actualActionIndex + 1
      }]`
    )
    setActualActionIndex(actualActionIndex + 1)
  }

  useEffect(() => {
    if (everyone.length === 1) return
    setBooleanChoiceVisible(everyone[actualActionIndex].text.includes('?'))
    if (everyone.length - 1 > actualActionIndex)
      startTimer(up, everyone[actualActionIndex].time * 300)
  }, [everyone, actualActionIndex])

  useEffect(() => {
    setEveryone(gamePlayStore.generateActions())
  }, []) */

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
