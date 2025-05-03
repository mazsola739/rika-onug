import { useMemo } from 'react'
import { StyledQuickGuideToken } from './QuickGuide.styles'
import { QuickGuideTokenProps } from './QuickGuide.types'
import { observer } from 'mobx-react-lite'

const SUPERHERO_IMAGES = ['annoying_lad', 'detector', 'evilometer', 'flipper', 'mirror_man', 'role_retriever', 'switcheroo', 'voodoo_lou', 'self_awareness_girl']

export const QuickGuideToken: React.ComponentType<QuickGuideTokenProps> = observer(({ image, expansion }) => {
  const segments = ['_of_', 'artifact', 'shield']
  const folder = segments.some(segment => image.includes(segment)) ? 'tokens' : 'cards'

  const bgImg = useMemo(() => {
    const isSuperhero = expansion === 'Super Villains' && SUPERHERO_IMAGES.includes(image)
    const actualExpansion = isSuperhero ? 'Super Heroes' : expansion
    const imageName = actualExpansion ? `${actualExpansion.toLowerCase().replace(/ /g, '')}` : image

    return `/assets/backgrounds/token_${imageName}.webp`
  }, [image, expansion])

  return <StyledQuickGuideToken src={`/assets/${folder}/${image}.webp`} alt={image} bgImg={bgImg} />
})
