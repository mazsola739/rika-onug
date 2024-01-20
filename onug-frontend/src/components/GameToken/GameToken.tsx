import { GameTokenProps } from './GameToken.types'
import {
  DopplegangerMarks,
  Marks,
  StyledGameToken,
  TokenImage,
  TokenName,
} from './GameToken.styles'
import { useMemo } from 'react'

export const GameToken: React.FC<GameTokenProps> = ({
  tokenName,
  display_name,
  isInDeck,
  hasDoppelganger,
}) => {
  const imageSrc = useMemo(
    () => `/assets/tokens/${isInDeck ? tokenName : 'mark_back'}.png`,
    [tokenName]
  )

  return (
    <StyledGameToken>
      <Marks>
        <TokenImage src={imageSrc} alt={tokenName} />
        <TokenName>{display_name}</TokenName>
      </Marks>
      {hasDoppelganger && (
        <DopplegangerMarks>
          <TokenImage src={imageSrc} alt={tokenName} />
        </DopplegangerMarks>
      )}
    </StyledGameToken>
  )
}
