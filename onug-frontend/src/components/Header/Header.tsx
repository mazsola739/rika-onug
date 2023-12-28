import { FooterProps } from 'components/Footer/Footer.types'
import { StyledHeader } from './Header.styles'

export const Header: React.FC<FooterProps> = ({ children }) => (
  <StyledHeader>{children}</StyledHeader>
)
