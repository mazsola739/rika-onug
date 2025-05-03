import roomsData from '../data/rooms.json'
import presetData from '../data/preset.json'
import { logErrorWithStack, logTrace } from '../log'

export const lobby = (req, res) => {
  try {
    logTrace('Lobby endpoint called')
    return res.send({
      message: 'Successfully fetched',
      data: {
        rooms: roomsData,
        presets: presetData
      }
    })
  } catch (error) {
    logErrorWithStack(error)
    return res.send({
      message: 'Failed to fetch lobby'
    })
  }
}
