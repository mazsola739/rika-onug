import { observer } from 'mobx-react-lite'
import { GlowingBorderProps } from './GlowingBorder.types'
import {
  InnerContainer,
  OuterGlow,
  StyledGlowingBorder,
} from './GlowingBorder.styles'

export const GlowingBorder: React.FC<GlowingBorderProps> = observer(
  ({ children, radius, glowColor }) => {
    return (
      <StyledGlowingBorder>
        <OuterGlow radius={radius} glowColor={glowColor} />
        <InnerContainer radius={radius} glowColor={glowColor}>{children}</InnerContainer>
      </StyledGlowingBorder>
    )
  }
)
