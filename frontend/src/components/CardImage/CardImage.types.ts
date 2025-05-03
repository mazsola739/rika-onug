import { ImgHTMLAttributes } from 'react'

export interface CardImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  image: string
  size: number
  onClick?: () => void
}
