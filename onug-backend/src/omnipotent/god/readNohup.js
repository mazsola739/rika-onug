import { logErrorWithStack, logTrace } from '../../log'
import { readNohupByService } from '../../repository'

export const readNohup = async (req, res) => {
  try {
    const { body } = req
    logTrace(`GOD check readNohup triggered: ${JSON.stringify(body)}`)
    const { service } = req.query
    const nohup = await readNohupByService(service)

    logTrace(`sending back nohup: ${nohup}`)

    return res.send({
      nohup
    })
  } catch (error) {
    logErrorWithStack(error)
  }
}
