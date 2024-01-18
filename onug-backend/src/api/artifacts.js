const artifactsData = require('../data/artifacts.json')
const { logTrace, logError } = require('../log')

exports.artifacts = (req, res) => {
  logTrace('Artifacts endpoint called')

  try {
    return res.send({
      message: 'Successfully fetched',
      data: artifactsData,
    })
  } catch (error) {
    logError('Error fetching artifacts:', error)
    return res.send({
      message: 'Failed to fetch artifacts',
    })
  }
}
