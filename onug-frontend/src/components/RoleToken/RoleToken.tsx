import React from 'react'
import { RoleTokenProps } from './RoleToken.types'
import { StyledRoleToken } from './RoleToken.styles'

const SUPERHERO_IMAGES = [
  'annoying_lad',
  'detector',
  'evilometer',
  'flipper',
  'mirror_man',
  'role_retriever',
  'switcheroo',
  'voodoo_lou',
  'self_awareness_girl'
]

export const RoleToken: React.FC<RoleTokenProps> = ({ token, size = 35 }) => {
  const bgImg = () => {
    const randomNumber = Math.floor(Math.random() * 2) + 1
    const isSuperhero = token.expansion === 'Super Villains' && SUPERHERO_IMAGES.includes(token.image)
    const actualExpansion = isSuperhero ? 'Super Heroes' : token.expansion
    const imageName = actualExpansion ? `${actualExpansion.toLowerCase().replace(/ /g, '')}_${randomNumber}` : token.image

    return `/assets/backgrounds/token_${imageName}.webp`
  }

  return (<StyledRoleToken src={`/assets/cards/${token.image}.webp`} alt={token.image} bgImg={bgImg()} isSelected={false} size={size} />)
}