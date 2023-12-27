import { Header, Footer } from 'components'
import { Main } from 'layouts'
import { observer } from 'mobx-react-lite'
import { deckStore } from 'store'
import { StyledApp } from './App.styles'

export const App = observer(() => {
  return (
    <StyledApp>
      <Header />
      <Main deckStore={deckStore} />
      <Footer />
    </StyledApp>
  )
})
