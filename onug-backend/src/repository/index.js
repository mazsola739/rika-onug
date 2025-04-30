import { logDebug } from '../log'

export const repositoryType = process.env.ONUG_REPOSITORY_TYPE || 'local'


export * from './local.repository'

import * as local from './local.repository'
import * as dynamoDB from './dynamodb.repository'

logDebug(`Chosen repository type: ${repositoryType}`)

export const repo = {
    local,
    dynamoDB,
}