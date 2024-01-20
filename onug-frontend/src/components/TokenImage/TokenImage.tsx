import { TokenImageProps } from './TokenImage.types'
import { StyledTokenImage } from './TokenImage.styles'
import { useMemo } from 'react'

export const TokenImage: React.FC<TokenImageProps> = ({
  tokenName,
  onClick,
}) => {
  const imageSrc = useMemo(() => `/assets/tokens/${tokenName}.png`, [tokenName])

  return <StyledTokenImage src={imageSrc} alt={tokenName} onClick={onClick} />
}
