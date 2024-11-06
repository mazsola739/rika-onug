import { useMemo } from 'react'
import { StyledToken } from './Token.styles'
import { TokenProps } from './Token.types'

export const Token: React.FC<TokenProps> = ({ tokenName, onClick, size, ready, isSelectable }) => {
  const imageSrc = useMemo(() => tokenName === '' ? `/assets/tokens/mark_back.webp` : `/assets/tokens/${tokenName}.webp`, [tokenName])
  
  return <StyledToken src={imageSrc} alt={tokenName} onClick={onClick} size={size} ready={ready} isSelectable={isSelectable} />
}
