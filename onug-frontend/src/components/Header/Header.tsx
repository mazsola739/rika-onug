import { FooterProps } from 'components/Footer/Footer.types'
import { StyledHeader } from './Header.styles'
import { observer } from 'mobx-react-lite'

export const Header: React.FC<FooterProps> = observer(({ children }) => (
  <StyledHeader>{children}</StyledHeader>
))
