import { StyledFooterButtons } from './FooterButtons.styles'
import { FooterButtonsProps } from './FooterButtons.types'

export const FooterButtons: React.FC<FooterButtonsProps> = ({ children }) => (
  <StyledFooterButtons>{children}</StyledFooterButtons>
)
