import { observer } from 'mobx-react-lite'
import { GlowingBorderProps } from './GlowingBorder.types'
import {
  InnerContainer,
  OuterGlow,
  StyledGlowingBorder,
} from './GlowingBorder.styles'

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
