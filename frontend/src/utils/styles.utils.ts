import { AnchorTypes, anchorColorVariants, imageVariants } from 'types'

export const lightenDarkenColor = (color: string, amount: number) => {
  const hex = color.replace('#', '')
  const rgb = parseInt(hex, 16)

  let r = (rgb >> 16) + amount
  let g = ((rgb >> 8) & 0xff) + amount
  let b = (rgb & 0xff) + amount

  r = Math.min(255, Math.max(0, r))
  g = Math.min(255, Math.max(0, g))
  b = Math.min(255, Math.max(0, b))

  const newHex = ((r << 16) + (g << 8) + b).toString(16)
  const newColor = `#${newHex.padStart(6, '0')}`
  return newColor
}

export const isAnchorType = (anchor: string): anchor is AnchorTypes => {
  return anchor in anchorColorVariants
}

export const getBackgroundColor = (anchor: string): string => {
  if (isAnchorType(anchor)) {
    return anchorColorVariants[anchor]
  }
  return anchorColorVariants['Village']
}

export const getBackgroundImage = (anchor: string): string => {
  if (isAnchorType(anchor)) {
    return imageVariants[anchor]
  }
  return imageVariants['Village']
}
