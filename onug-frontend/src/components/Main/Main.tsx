import { observer } from 'mobx-react-lite'
import { StyledMain } from './Main.styles'
import { MainProps } from './Main.types'

export const Main: React.FC<MainProps> = observer(({ children }) => (
  <StyledMain>{children}</StyledMain>
))
