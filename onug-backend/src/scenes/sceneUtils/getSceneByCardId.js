import { ALIENS, SUPER_VILLAINS, VAMPIRES, WEREWOLVES } from '../../constants'
import cards from '../../data/cards.json'

export const getSceneByCardId = newSelectedCards => {
  return newSelectedCards.map(cardId => {
    const role = cards.find(card => card.id === cardId).role

    if (WEREWOLVES.includes(cardId)) {
      return 'WEREWOLVES'
    } else if (ALIENS.includes(cardId)) {
      return 'ALIENS'
    } else if (VAMPIRES.includes(cardId)) {
      return 'VAMPIRES'
    } else if (SUPER_VILLAINS.includes(cardId)) {
      return 'SUPER_VILLAINS'
    } else {
      return role
    }
  })
}
