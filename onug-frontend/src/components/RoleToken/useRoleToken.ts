import { voteStore } from 'store'

export const useRoleTokens = (token: any) => {
  //TODO refactor
  const handleGuessClick = () => {
    voteStore.selectGuessId(token.id)
  }

  const getBackgroundImage = () => {
    const SUPERHERO_IMAGES = ['annoying_lad', 'detector', 'evilometer', 'flipper', 'mirror_man', 'role_retriever', 'switcheroo', 'voodoo_lou', 'self_awareness_girl']

    const isSuperhero = token.expansion === 'Super Villains' && SUPERHERO_IMAGES.includes(token.image)
    const actualExpansion = isSuperhero ? 'Super Heroes' : token.expansion
    const imageName = actualExpansion ? `${actualExpansion.toLowerCase().replace(/ /g, '')}` : token.image

    return `/assets/backgrounds/token_${imageName}.webp`
  }

  return { handleGuessClick, getBackgroundImage }
}
