import { API_LOCALHOST } from 'constant'

export const roomsRequest = async () => {
  try {
    const response = await fetch(`${API_LOCALHOST}/api/rooms`)
    const data = await response.json()

    if (data.message === 'Successfully fetched') {
      return data.data
    } else {
      throw new Error('Failed to fetch rooms')
    }
  } catch (error) {
    throw new Error('An error occurred while fetching rooms')
  }
}
