import { logWarn } from '../log'

const validCardIdRange = [1, 86]

const CARDS_ARE_NOT_AN_ARRAY = 'Cards were not provided as an array'
const CARD_NOT_IN_VALID_RANGE = 'Card IDs were not in the right ID range'
const DUPLICATED_CARD = 'Card IDs were duplicated.'

export const validateCards = cards => {
  try {
    const errors = []

    const cardsStructIsArray = Array.isArray(cards)
    if (!cardsStructIsArray) {
      errors.push(CARDS_ARE_NOT_AN_ARRAY)
      return [false, errors]
    }

    const cardsAreInTheRightIdRange = cards.every(card => card >= validCardIdRange[0] && card <= validCardIdRange[1])
    if (!cardsAreInTheRightIdRange) errors.push(CARD_NOT_IN_VALID_RANGE)

    const duplicates = new Set(cards).size !== cards.length
    if (duplicates) errors.push(`${DUPLICATED_CARD} IDs: ${cards}`)

    const validity = errors.length === 0
    if (!validity) logWarn(`Validation errors: ${errors}`)

    return [validity, errors]
  } catch (error) {
    logWarn(`Unexpected error in validateCards: ${error.message}`)
    return [false, ['An unexpected error occurred during card validation.']]
  }
}
