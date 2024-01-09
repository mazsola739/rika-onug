export const hydrateSelectRequest = async (roomId: string) => {
  try {
    const requestBody = {
      route: 'hydrate-select',
      room_id: roomId,
    }

    const response = await fetch('http://localhost:7654/', {
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
