import { observer } from 'mobx-react-lite'
import { StyledFooter, CopyrightText } from './Footer.styles'
import { FooterProps } from './Footer.types'

export const Footer: React.ComponentType<FooterProps> = observer(({ children }) => (
  <StyledFooter>
    {children}
    <CopyrightText>© 2023-2025 Rika - ✨Pixels? They survived the night! This app runs solely on ☕ and 🦄 magic!✨</CopyrightText>
  </StyledFooter>
))
