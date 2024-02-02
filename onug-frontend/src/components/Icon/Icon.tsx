import { useMemo } from 'react'
import { StyledIcon } from './Icon.styles'
import { IconProps } from './Icon.types'

export const Icon: React.FC<IconProps> = ({ iconName, size, fill }) => {
  const imageSrc = useMemo(() => `/assets/icons/${iconName}.svg`, [iconName])

  return (
    <StyledIcon size={size} fill={fill}>
      <use xlinkHref={imageSrc} />
    </StyledIcon>
  )
}
