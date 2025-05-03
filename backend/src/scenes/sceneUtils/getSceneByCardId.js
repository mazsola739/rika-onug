import { ALIEN_IDS, SUPER_VILLAIN_IDS, VAMPIRE_IDS, WEREWOLVES } from '../../constants'
import cards from '../../data/cards.json'

export const getSceneByCardId = newSelectedCards => {
  return newSelectedCards.map(cardId => {
    const role = cards.find(card => card.id === cardId).role

    if (WEREWOLVES.includes(cardId)) {
      return 'WEREWOLVES'
    } else if (ALIEN_IDS.includes(cardId)) {
      return 'ALIENS'
    } else if (VAMPIRE_IDS.includes(cardId)) {
      return 'VAMPIRES'
    } else if (SUPER_VILLAIN_IDS.includes(cardId)) {
      return 'SUPER_VILLAINS'
    } else {
      return role
    }
  })
}
