const repositoryType = process.env.ONUG_REPOSITORY_TYPE || 'memory'
const repositoryPath = `../repository/${repositoryType}-repository`
const repository = require(repositoryPath)
import { logDebug } from "../log";

logDebug(`Chosen repository type: ${repositoryType}`)

export default {
  repository,
};