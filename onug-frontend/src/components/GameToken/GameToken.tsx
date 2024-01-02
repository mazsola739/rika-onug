import { GameTokenProps } from './GameToken.types'
import {
  DopplegangerMarks,
  Marks,
  StyledGameToken,
  TokenImage,
  TokenName,
} from './GameToken.styles'
import { useMemo } from 'react'

//TODO DOPPELGANGER

export const GameToken: React.FC<GameTokenProps> = ({
  tokenName,
  display_name,
  isInDeck,
}) => {
  const imageSrc = useMemo(
    () =>
      require(`../../assets/tokens/${isInDeck ? tokenName : 'mark_back'}.png`),
    [tokenName]
  )

  return (
    <StyledGameToken>
      <Marks>
        <TokenImage src={imageSrc} alt={tokenName} />
        <TokenName>{display_name}</TokenName>
      </Marks>
      <DopplegangerMarks>
        <TokenImage src={imageSrc} alt={tokenName} />
      </DopplegangerMarks>
    </StyledGameToken>
  )
}
