export const cardsRequest = async () => {
  try {
    const response = await fetch('/api/cards')
    const data = await response.json()

    if (data.message === 'Successfully fetched') {
      return data.data
    } else {
      throw new Error('Failed to fetch cards')
    }
  } catch (error) {
    throw new Error('An error occurred while fetching cards')
  }
}
