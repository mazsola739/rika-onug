export const hydrateSelectRequest = async (roomId: string) => {
  try {
    const requestBody = {
      room_id: roomId,
    }

    const response = await fetch('/api/hydrate-select', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const responseData = await response.json()
    return responseData
  } catch (error) {
    throw new Error(`Error hydrating select information: ${error.message}`)
  }
}
