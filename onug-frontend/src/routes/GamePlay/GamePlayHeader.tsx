import { GamePlayCard } from 'components'
import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import { gamePlayStore } from 'store'
import { StyledGamePlayHeader, GamePlayText } from './GamePlay.styles'

export const GamePlayHeader: React.FC = observer(() => {
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
        <GamePlayCard image={everyone[currentScenarioIndex].image} />
      )}
      <GamePlayText>{everyone[currentScenarioIndex].text}</GamePlayText>
    </StyledGamePlayHeader>
  )
})
