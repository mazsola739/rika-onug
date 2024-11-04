import { useMemo } from 'react'
import { StyledQuickGuideToken } from './QuickGuide.styles'
import { QuickGuideTokenProps } from './QuickGuide.types'

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

export const QuickGuideToken: React.FC<QuickGuideTokenProps> = ({ image, expansion }) => {
  const segments = ['_of_', 'artifact', 'shield']
  const folder = segments.some(segment => image.includes(segment)) ? 'tokens' : 'cards'

  const backgroundImage = useMemo(() => {
    const randomNumber = Math.floor(Math.random() * 2) + 1
    const isSuperhero = expansion === 'Super Villains' && SUPERHERO_IMAGES.includes(image)
    const actualExpansion = isSuperhero ? 'Super Heroes' : expansion
    const imageName = actualExpansion ? `${actualExpansion.toLowerCase().replace(/ /g, '')}_${randomNumber}` : image

    return `/assets/backgrounds/token_${imageName}.webp`
  }, [image, expansion])

  return (
    <StyledQuickGuideToken src={`/assets/${folder}/${image}.webp`} alt={image} backgroundImage={backgroundImage} />
  )
}