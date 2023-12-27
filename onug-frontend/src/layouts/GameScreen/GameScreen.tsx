import { observer } from 'mobx-react-lite'
import { StyledGameScreen } from './GameScreen.styles'
import { everyoneStore } from 'store'

export const GameScreen = observer(() => {
  const everyone = everyoneStore.generateActions()

  return (
    <StyledGameScreen>
      <pre>
        {everyone.map((card) => card.text).join(`
`)}
      </pre>
    </StyledGameScreen>
  )
})
