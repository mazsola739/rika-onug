import { logErrorWithStack, logTrace } from '../../log'
import { repo, repositoryType } from '../../repository'

export const readNohup = async (req, res) => {
  try {
    const { body } = req
    logTrace(`GOD check readNohup triggered: ${JSON.stringify(body)}`)
    const { service } = req.query
    const response = await repo[repositoryType].readNohupByService(service)

    logTrace(`sending back nohup: ${response}`)

    return res.send({
      response
    })
  } catch (error) {
    logErrorWithStack(error)
  }
}
