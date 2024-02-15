const { logTrace, logErrorWithStack } = require("../log")

const initStubbedCards = {
  playerCards:    [],
  leftCard:       null,
  middleCard:     null,
  rightCard:      null,
  newWolfCard:    null,
  newVillainCard: null,
}
let stubbedCards = initStubbedCards

const getCenterCardPositionByIndex = index => {
  if (index === 0) return 'leftCard'
  if (index === 1) return 'middleCard'
  return 'rightCard'
}

const populateDeal = async (req, res) => {
  try {
    const { reset, Player1, Player2, Player3, Player4, Player5, Player6, Player7, Player8, Player9, Player10, Player11, Player12,
      CenterLeft, CenterMiddle, CenterRight, CenterWolf, CenterVillain } = req.body
    logTrace(`Stub populate dealing endpoint triggered`, req.body)
  if (reset) {
    stubbedCards = initStubbedCards

    return res.send(JSON.stringify({ stub: 'reseted', stubbedCards }))
  }

  stubbedCards.leftCard        = CenterLeft
  stubbedCards.middleCard      = CenterMiddle
  stubbedCards.rightCard       = CenterRight
  stubbedCards.newWolfCard     = CenterWolf
  stubbedCards.newVillainCard  = CenterVillain
  stubbedCards.playerCards[0]  = Player1
  stubbedCards.playerCards[1]  = Player2
  stubbedCards.playerCards[2]  = Player3
  stubbedCards.playerCards[3]  = Player4
  stubbedCards.playerCards[4]  = Player5
  stubbedCards.playerCards[5]  = Player6
  stubbedCards.playerCards[6]  = Player7
  stubbedCards.playerCards[7]  = Player8
  stubbedCards.playerCards[8]  = Player9
  stubbedCards.playerCards[9]  = Player10
  stubbedCards.playerCards[10] = Player11
  stubbedCards.playerCards[11] = Player12
  
  return res.send(JSON.stringify({ stub: 'populated', stubbedCards }))
  } catch (error) {
    logErrorWithStack(error)
  }
}

module.exports = {
  populateDeal,
  stubbedCards,
  getCenterCardPositionByIndex,
}
