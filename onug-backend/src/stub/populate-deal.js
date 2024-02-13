const {logTrace, logErrorWithStack} = require("../log")

let stubbedCards = {
  playerCards: [],
  leftCard: null,
  middleCard: null,
  rightCard: null,
  newWolfCard: null,
  newVillainCard: null,
}

const populateDeal = async (req, res) => {
  try {
    const { reset, P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12,
    newWolfCard, newVillainCard, middleCard, rightCard, leftCard } = req.body
    logTrace(`Stub populate dealing endpoint triggered`, req.body)
    if (reset) {
      stubbedCards = {
        playerCards: [],
        leftCard: null,
        middleCard: null,
        rightCard: null,
        newWolfCard: null,
        newVillainCard: null,
      }

      return res.send(JSON.stringify({stub: 'reseted', stubbedCards}))
    }
    stubbedCards.newWolfCard = newWolfCard
    stubbedCards.newVillainCard = newVillainCard
    stubbedCards.middleCard = middleCard
    stubbedCards.rightCard = rightCard
    stubbedCards.leftCard = leftCard
    stubbedCards.playerCards[0] = P1
    stubbedCards.playerCards[1] = P2
    stubbedCards.playerCards[2] = P3
    stubbedCards.playerCards[3] = P4
    stubbedCards.playerCards[4] = P5
    stubbedCards.playerCards[5] = P6
    stubbedCards.playerCards[6] = P7
    stubbedCards.playerCards[7] = P8
    stubbedCards.playerCards[8] = P9
    stubbedCards.playerCards[9] = P10
    stubbedCards.playerCards[10] = P11
    stubbedCards.playerCards[11] = P12

    return res.send(JSON.stringify({stub: 'populated', stubbedCards}))
  } catch (error) {
    logErrorWithStack(error)
  }
}

module.exports = {
  populateDeal,
  stubbedCards,
}
