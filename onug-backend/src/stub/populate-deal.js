import { logTrace, logErrorWithStack } from '../log'

const initStubbedCards = {
  playerCards:    [],
  leftCard:       null,
  middleCard:     null,
  rightCard:      null,
  newWolfCard:    null,
  newVillainCard: null,
}
export let stubbedCards = JSON.parse(JSON.stringify(initStubbedCards))

export const getCenterCardPositionByIndex = index => {
  if (index === 0) return 'leftCard'
  if (index === 1) return 'middleCard'
  return 'rightCard'
}

export const populateDeal = async (req, res) => {
  try {
    const body = req.body
    const { reset, CenterLeft, CenterMiddle, CenterRight, CenterWolf, CenterVillain } = body
    logTrace(`Stub populate dealing endpoint triggered`, body)
    if (reset) {
      stubbedCards = JSON.parse(JSON.stringify(initStubbedCards))

      return res.send(JSON.stringify({ stub: 'reseted', stubbedCards, initStubbedCards }))
    }

    stubbedCards.leftCard        = CenterLeft
    stubbedCards.middleCard      = CenterMiddle
    stubbedCards.rightCard       = CenterRight
    stubbedCards.newWolfCard     = CenterWolf
    stubbedCards.newVillainCard  = CenterVillain
    for (let index = 1 ; index < 13 ; index++) {
      stubbedCards.playerCards[index-1] = body[`Player${index}`]
    }
    
    return res.send(JSON.stringify({ stub: 'populated', stubbedCards }))
  } catch (error) {
    logErrorWithStack(error)
  }
}
