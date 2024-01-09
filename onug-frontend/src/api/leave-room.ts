export const leaveRoomRequest = async (roomId: string, playerName: string) => {
  try {
    const requestBody = {
      route: 'leave-room',
      room_id: roomId,
      player_name: playerName,
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
    throw new Error(`Error leaving room: ${error.message}`)
  }
}
