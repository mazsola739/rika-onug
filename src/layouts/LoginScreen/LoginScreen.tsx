import React, { useState } from 'react'

export const LoginScreen: React.FC = () => {
  const [roomID, setRoomID] = useState<string>('')
  const [nickname, setNickname] = useState<string>(generateRandomNickname())
  const [isCreatingRoom, setIsCreatingRoom] = useState<boolean>(false)

  const handleRoomIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomID(event.target.value)
  }

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value)
  }

  const handleToggleCreateRoom = () => {
    setIsCreatingRoom(!isCreatingRoom)
  }

  const handleJoinRoom = () => {
    // Handle logic for joining an existing room
    if (roomID.trim() !== '') {
      console.log('Joining Room ID:', roomID, 'with nickname:', nickname)
      // Implement your logic for joining the room
    }
  }

  const handleCreateRoom = () => {
    // Handle logic for creating a new room
    console.log('Creating Room with nickname:', nickname)
    // Implement your logic for creating a new room
  }

  const handleGenerateRoom = () => {
    // Handle logic for generating a new room
    setIsCreatingRoom(true)
    setRoomID('')
    console.log('Generating new room with nickname:', nickname)
    // Implement your logic for generating a new room
  }

  return (
    <div>
      <h1>Login Screen</h1>
      <label>
        {isCreatingRoom
          ? 'Room ID (Leave empty for new room):'
          : 'Enter Room ID:'}
        <input type="text" value={roomID} onChange={handleRoomIDChange} />
      </label>
      <label>
        Your Nickname:
        <input type="text" value={nickname} onChange={handleNicknameChange} />
      </label>
      <button
        onClick={isCreatingRoom ? handleCreateRoom : handleJoinRoom}
        disabled={!isCreatingRoom && roomID.trim() === ''}
      >
        {isCreatingRoom ? 'Create Room' : 'Join Room'}
      </button>
      <button onClick={handleToggleCreateRoom}>
        {isCreatingRoom ? 'Join Existing Room' : 'Create New Room'}
      </button>
      <button onClick={handleGenerateRoom} disabled={isCreatingRoom}>
        Generate Room
      </button>
    </div>
  )
}

// Helper function to generate a random nickname
const generateRandomNickname = (): string => {
  const adjectives = ['Happy', 'Brave', 'Silly', 'Clever', 'Adventurous']
  const nouns = ['Cat', 'Dog', 'Fox', 'Penguin', 'Elephant']
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
  return `${randomAdjective}_${randomNoun}`
}
