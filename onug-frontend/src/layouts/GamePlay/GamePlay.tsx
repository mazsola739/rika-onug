import { observer } from 'mobx-react-lite'
import { StyledGamePlay } from './GamePlay.styles'
import { gamePlayStore } from 'store'

export const GamePlay = observer(() => {
  const everyone = gamePlayStore.generateActions()

  return (
    <StyledGamePlay>
      <pre>
        {everyone.map((card) => card.text).join(`
`)}
      </pre>
    </StyledGamePlay>
  )
})
