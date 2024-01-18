export const artifactsRequest = async () => {
  try {
    const response = await fetch('/api/artifacts')
    const data = await response.json()

    if (data.message === 'Successfully fetched') {
      return data.data
    } else {
      throw new Error('Failed to fetch artifacts')
    }
  } catch (error) {
    throw new Error('An error occurred while fetching artifacts')
  }
}
