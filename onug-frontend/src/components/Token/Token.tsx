import { useMemo } from 'react'
import { StyledToken } from './Token.styles'
import { TokenProps } from './Token.types'

export const Token: React.FC<TokenProps> = ({
  tokenName,
  onClick,
  size,
  ready,
}) => {
  const imageSrc = useMemo(() => `/assets/tokens/${tokenName}.png`, [tokenName])

  return (
    <StyledToken
      src={imageSrc}
      alt={tokenName}
      onClick={onClick}
      size={size}
      ready={ready}
    />
  )
}
