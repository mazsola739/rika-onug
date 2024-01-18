const cardsData = require('../data/cards.json')
const { logTrace, logError } = require('../log')

exports.cards = (req, res) => {
  logTrace('Cards endpoint called')

  try {
    return res.send({
      message: 'Successfully fetched',
      data: cardsData,
    })
  } catch (error) {
    logError('Error fetching cards:', error)
    return res.send({
      message: 'Failed to fetch cards',
    })
  }
}
