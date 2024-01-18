export const marksRequest = async () => {
  try {
    const response = await fetch('/api/marks')
    const data = await response.json()

    if (data.message === 'Successfully fetched') {
      return data.data
    } else {
      throw new Error('Failed to fetch marks')
    }
  } catch (error) {
    throw new Error('An error occurred while fetching marks')
  }
}
