import { observer } from 'mobx-react-lite'
import { voteStore } from 'store'
import { RoleToken, StyledRoleTokenList } from './RoleTokenList.styles'
import { RoleTokenListProps } from './RoleTokenList.types'

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

export const RoleTokenList: React.FC = observer(() => {
  const { voteTokens } = voteStore

  const bgImg = (expansion: string, image: string) => {
    const randomNumber = Math.floor(Math.random() * 2) + 1
    const isSuperhero = expansion === 'Super Villains' && SUPERHERO_IMAGES.includes(image)
    const actualExpansion = isSuperhero ? 'Super Heroes' : expansion
    const imageName = actualExpansion ? `${actualExpansion.toLowerCase().replace(/ /g, '')}_${randomNumber}` : image

    return `/assets/backgrounds/token_${imageName}.webp`
  }

  return (
    <StyledRoleTokenList>
      {voteTokens.map(({image, expansion}, index) => (
        <RoleToken key={index} src={`/assets/cards/${image}.webp`} alt={image} bgImg={bgImg(expansion, image)} /* isSelected={isSelected} */ onClick={()=>console.log('lalalala')} />
      ))}
    </StyledRoleTokenList>
  )
})
