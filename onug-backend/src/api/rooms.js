import roomsData from '../data/rooms.json'
import { logErrorWithStack, logTrace } from '../log'

export const rooms = (req, res) => {
  try {
    logTrace('Rooms endpoint called')
    return res.send({
      message: 'Successfully fetched',
      data: roomsData,
    })
  } catch (error) {
    logErrorWithStack(error)
    return res.send({
      message: 'Failed to fetch rooms',
    })
  }
}
