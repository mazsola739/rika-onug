import { logDebug } from '../log'

const repositoryType = process.env.ONUG_REPOSITORY_TYPE || 'memory'
const repositoryPath = `../repository/${repositoryType}.repository`

export * from './local.repository'

logDebug(`Chosen repository type: ${repositoryType}`)
