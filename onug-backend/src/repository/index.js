const repositoryType = process.env.ONUG_REPOSITORY_TYPE || 'memory'
const repositoryPath = `../repository/${repositoryType}-repository`
const repository = require(repositoryPath)
const { logDebug } = require('../log')
logDebug(`Choosen repository type: ${repositoryType}`)

module.exports = {
  repository,
}