import { observer } from 'mobx-react-lite'
import { StyledFooter } from './Footer.styles'
import { FooterProps } from './Footer.types'

export const Footer: React.FC<FooterProps> = observer(({ children }) => (
  <StyledFooter>{children}</StyledFooter>
))
