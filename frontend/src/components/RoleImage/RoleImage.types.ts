import { ImgHTMLAttributes } from 'react'

export interface RoleImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  image: string
  size: number
  onClick?: () => void
}

export interface StyledRoleImageProps {
  size: number
}
