import { GameTokenProps } from './GameToken.types'
import {
  Marks,
  StyledGameToken,
  TokenImage,
  TokenName,
} from './GameToken.styles'
import { useMemo } from 'react'

export const GameToken: React.FC<GameTokenProps> = ({
  tokenName,
  display_name,
}) => {
  const imageSrc = useMemo(() => `/assets/tokens/${tokenName}.png`, [tokenName])

  return (
    <StyledGameToken>
      <Marks>
        <TokenImage src={imageSrc} alt={tokenName} />
        <TokenName>{display_name}</TokenName>
      </Marks>
    </StyledGameToken>
  )
}
