import { observer } from 'mobx-react-lite'
import { StyledGamePlay } from './GamePlay.styles'
import { gamePlayStore } from 'store'
import { Footer, Header } from 'components'

export const GamePlay = observer(() => {
  const everyone = gamePlayStore.generateActions()

  return (
    <>
      <Header>
        <p>header</p>
      </Header>
      <StyledGamePlay>
        <pre>
          {everyone.map((card) => card.text).join(`   
    `)}
        </pre>
      </StyledGamePlay>
      <Footer>
        <p>footer</p>
      </Footer>
    </>
  )
})
