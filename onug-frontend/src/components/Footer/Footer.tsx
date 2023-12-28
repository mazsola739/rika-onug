import { StyledFooter } from './Footer.styles'
import { FooterProps } from './Footer.types'

export const Footer: React.FC<FooterProps> = ({ children }) => (
  <StyledFooter>{children}</StyledFooter>
)
