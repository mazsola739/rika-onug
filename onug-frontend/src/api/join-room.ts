export const joinRoomRequest = async (roomId: string) => {
  try {
    const requestBody = {
      room_id: roomId,
    }

    const response = await fetch('/api/join-room', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    const responseData = await response.json()

    return responseData
  } catch (error) {
    throw new Error(`Error joining room: ${error.message}`)
  }
}
