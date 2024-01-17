export const leaveRoomRequest = async () => {
  const requestBody = {
    room_id: sessionStorage.getItem('room_id'),
    player_name: sessionStorage.getItem('player_name'),
    token: sessionStorage.getItem('token'),
  }
  try {
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
