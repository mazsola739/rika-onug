import { roomsJson, presetJson } from '../data'
import { logErrorWithStack, logTrace } from '../log'

export const lobby = (req, res) => {
  try {
    logTrace('Lobby endpoint called')
    return res.send({
      message: 'Successfully fetched',
      data: {
        rooms: roomsJson,
        presets: presetJson
      }
    })
  } catch (error) {
    logErrorWithStack(error)
    return res.send({
      message: 'Failed to fetch lobby'
    })
  }
}
