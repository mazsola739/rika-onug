import { observer } from 'mobx-react-lite'
import { StyledGamePlayHeader } from './GamePlay.styles'

export const GamePlayHeader: React.FC = observer(() => {
  return (
    <StyledGamePlayHeader>
      {/*       <GamePlayCard image={everyone[currentScenarioIndex].image} />

      <GamePlayText>{everyone[currentScenarioIndex].text}</GamePlayText> */}
    </StyledGamePlayHeader>
  )
})
