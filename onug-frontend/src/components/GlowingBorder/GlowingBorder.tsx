import { observer } from 'mobx-react-lite'
import { InnerContainer, OuterGlow, StyledGlowingBorder } from './GlowingBorder.styles'
import { GlowingBorderProps } from './GlowingBorder.types'

export const GlowingBorder: React.FC<GlowingBorderProps> = observer(
  ({ children, radius, glowColor, sizeH, sizeW }) => {
    return (
      <StyledGlowingBorder>
        <OuterGlow radius={radius} glowColor={glowColor} sizeH={sizeH} sizeW={sizeW}/>
        <InnerContainer radius={radius} glowColor={glowColor} sizeH={sizeH} sizeW={sizeW}>{children}</InnerContainer>
      </StyledGlowingBorder>
    )
  }
)
