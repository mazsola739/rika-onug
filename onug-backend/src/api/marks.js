const marksData = require('../data/marks.json')
const { logTrace, logError } = require('../log')

exports.marks = (req, res) => {
  logTrace('Marks endpoint called')

  try {
    return res.send({
      message: 'Successfully fetched',
      data: marksData,
    })
  } catch (error) {
    logError('Error fetching marks:', error)
    return res.send({
      message: 'Failed to fetch marks',
    })
  }
}
