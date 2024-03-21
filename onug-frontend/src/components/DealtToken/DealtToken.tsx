import { useMemo } from 'react'
import { StyledDealtToken } from './DealtToken.styles'
import { DealtTokenProps } from './DealtToken.types'

export const DealtToken: React.FC<DealtTokenProps> = ({
  tokenName,
  onClick,
  size,
  ready,
}) => {
  const imageSrc = useMemo(() => `/assets/tokens/${tokenName}.png`, [tokenName])

  return <StyledDealtToken  src={imageSrc}  alt={tokenName}  onClick={onClick}  size={size}  ready={ready} />
}
