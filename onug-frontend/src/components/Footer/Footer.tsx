import { observer } from 'mobx-react-lite'
import { StyledFooter, CopyrightText } from './Footer.styles'
import { FooterProps } from './Footer.types'

export const Footer: React.FC<FooterProps> = observer(({ children }) => (
  <StyledFooter>
    {children}
    <CopyrightText>
      © 2024 Rika - ✨Pixels? They survived the night! This app runs solely on ☕ and 🦄 magic!✨
    </CopyrightText>
  </StyledFooter>
))
