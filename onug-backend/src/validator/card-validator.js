import { logWarn } from '../log';
const validCardIdRange = [1, 86]

const CARDS_ARE_NOT_AN_ARRAY = 'Cards were not provided as an array'
const CARD_IDS_NOT_IN_VALID_RANGE = 'Card IDs were not in the right ID range'
const DUPLICATED_CARD_IDS = 'Card IDs were duplicated.'

export const validateCards = (cards) => {
  const errors = []

  const cardsStructIsArray = Array.isArray(cards)
  if (!cardsStructIsArray) {
    errors.push(CARDS_ARE_NOT_AN_ARRAY)
    return [false, errors]
  }

  const cardsAreInTheRightIdRange = cards.every(
    (card) => card >= validCardIdRange[0] && card <= validCardIdRange[1]
  )
  if (!cardsAreInTheRightIdRange) errors.push(CARD_IDS_NOT_IN_VALID_RANGE)

  const duplicates = new Set(cards).size !== cards.length
  if (duplicates) errors.push(`${DUPLICATED_CARD_IDS} IDs: ${cards}`)

  const validity = errors.length === 0
  if (!validity) logWarn(`Validation errors: ${errors}`)

  return [validity, errors]
};
