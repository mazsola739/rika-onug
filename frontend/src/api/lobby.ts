import { API_HOST } from 'constant'

export const lobbyRequest = async () => {
  try {
    const response = await fetch(`${API_HOST}/api/lobby`)
    const data = await response.json()

    if (data.message === 'Successfully fetched') {
      return data.data
    } else {
      throw new Error('Failed to fetch lobby')
    }
  } catch (error) {
    throw new Error('An error occurred while fetching lobby')
  }
}
