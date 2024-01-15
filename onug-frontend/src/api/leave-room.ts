export const leaveRoomRequest = async (roomId: string, playerName: string) => {
  try {
    const requestBody = {
      room_id: roomId,
      player_name: playerName,
    }

    const response = await fetch('/api/leave-room', {
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
