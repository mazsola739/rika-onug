import { observer } from 'mobx-react-lite'
import { GlowingBorderProps } from './GlowingBorder.types'
import {
  InnerContainer,
  OuterGlow,
  StyledGlowingBorder,
} from './GlowingBorder.styles'

export const GlowingBorder: React.FC<GlowingBorderProps> = observer(
  ({ children }) => {
    return (
      <StyledGlowingBorder>
        <OuterGlow />
        <InnerContainer>{children}</InnerContainer>
      </StyledGlowingBorder>
    )
  }
)
