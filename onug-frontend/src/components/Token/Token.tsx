import { useMemo } from 'react'
import { StyledToken } from './Token.styles'
import { TokenProps } from './Token.types'

export const Token: React.FC<TokenProps> = ({ tokenName, onClick, size, ready }) => {
  const imageSrc = useMemo(() => tokenName === '' ? `/assets/tokens/mark_back.png` : `/assets/tokens/${tokenName}.png`, [tokenName])

  return <StyledToken src={imageSrc} alt={tokenName} onClick={onClick} size={size} ready={ready} />
}
