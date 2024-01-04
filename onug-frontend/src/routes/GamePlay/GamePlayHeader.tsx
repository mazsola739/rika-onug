import { GamePlayImage } from 'components'
import { observer } from 'mobx-react-lite'
import { GamePlayText, StyledGamePlayHeader } from './GamePlay.styles'
import { gamePlayStore } from 'store'
import { useEffect, useState } from 'react'

export const GamePlayHeader = observer(() => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0)

  const everyone = gamePlayStore.generateActions()

  const advanceToNextScenario = () => {
    setCurrentScenarioIndex((prevIndex) =>
      prevIndex < everyone.length - 1 ? prevIndex + 1 : prevIndex
    )
  }

  useEffect(() => {
    const timer = setInterval(() => {
      advanceToNextScenario()
    }, everyone[currentScenarioIndex].time * 1000)

    return () => {
      clearInterval(timer)
    }
  }, [currentScenarioIndex])

  return (
    <StyledGamePlayHeader>
      {everyone[currentScenarioIndex].image.length > 0 && (
        <GamePlayImage image={everyone[currentScenarioIndex].image} />
      )}
      <GamePlayText>{everyone[currentScenarioIndex].text}</GamePlayText>
    </StyledGamePlayHeader>
  )
})
