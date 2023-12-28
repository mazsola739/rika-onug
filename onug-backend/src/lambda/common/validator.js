const validCardIds = [1, 86]

const CARDS_ARE_NOT_AN_ARRAY = 'cards were not provided as an array'
const CARD_IDS_NOT_IN_VALID_RANGE = 'card ids were notin the right id range'
const DUPLICATED_CARD_IDS = 'card ids were duplicated.'
const validateCards = (cards) => {
    const errors = []

    const cardsStructIsArray = Array.isArray(cards)
    if (!cardsStructIsArray) errors.push(CARDS_ARE_NOT_AN_ARRAY)

    const cardsAreInTheRightIdRange = cards.every(card => card >= validCardIds[0] && card <= validCardIds[1])
    if (!cardsAreInTheRightIdRange) errors.push(CARD_IDS_NOT_IN_VALID_RANGE)

    const duplicates = new Set(cards).size !== cards.length
    if (duplicates) errors.push(`${DUPLICATED_CARD_IDS} Ids: ${cards}`)

    const validity = errors.length === 0
    if (errors.length > 0) console.log(`validation errors: ${errors}`)

    return [validity, errors]
}

module.exports = {
    validateCards
}