import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { StyledTokenImage } from './TokenImage.styles'
import { TokenImageProps } from './TokenImage.types'

export const TokenImage: React.FC<TokenImageProps> = observer(({ onClick, size = 30, image, ready = true }) => {
  const imageSrc = useMemo(() => (image === '' ? `/assets/tokens/mark_back.webp` : `/assets/tokens/${image}.webp`), [image])

  return <StyledTokenImage src={imageSrc} alt={image} onClick={onClick} size={size} ready={ready} />
})
