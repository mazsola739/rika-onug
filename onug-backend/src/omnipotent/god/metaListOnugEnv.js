import { logTrace, logErrorWithStack } from '../../log'

export const metaListOnugEnv = async (req, res) => {
  try {
    logTrace(`GOD list onug environments endpoint triggered`)
    const onugEnvsArray = Object.entries(process.env).filter(([key]) =>
      key.includes('ONUG_')
    )
    const onugEnvs = {}
    onugEnvsArray.forEach(([key, value]) => {
      onugEnvs[key] = value
    })

    return res.send(onugEnvs)
  } catch (error) {
    logErrorWithStack(error)
  }
}
