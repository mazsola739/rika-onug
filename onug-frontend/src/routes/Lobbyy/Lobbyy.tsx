import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { StyledLobbyy, FormContainer, Label, Input, Select, ButtonB, SelectedRoom, Selection, RoomBackground } from './Lobbyy.styles'
import { useLobbyy } from './useLobbyy'
import { Button, ButtonGroup } from 'components'

export const Lobbyy: React.ComponentType = observer(() => {
  const { lobbyStore } = useLobbyy()

  const generateFunnyNickname = () => {
    const adjectives = ['Witty', 'Brave', 'Silly', 'Clever', 'Happy', 'Grumpy', 'Sneaky', 'Jolly', 'Sneaky', 'Cunning', 'Mysterious', 'Devious', 'Shadowy', 'Sinister', 'Crafty', 'Tricky', 'Sly', 'Wily', 'Evil', 'Cunning', 'Mischievous', 'Cheeky', 'Naughty', 'Rascally']
    const nouns = ['Penguin', 'Dragon', 'Unicorn', 'Ninja', 'Pirate', 'Wizard', 'Knight', 'Robot', 'Werewolf', 'Vampire', 'Alien', 'Spy', 'Thief', 'Saboteur', 'Villain', 'Impostor', 'Hero', 'Demon', 'Ghost', 'Zombie', 'Monster', 'Dinosaur', 'Troll', 'Giant', 'Fairy', 'Elf', 'Mermaid', 'Sasquatch', 'Yeti']
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
    return `${randomAdjective}${randomNoun}`
  }

  const [selectedRoom, setSelectedRoom] = useState('')
  const [nickname, setNickname] = useState(() => localStorage.getItem('nickname') || generateFunnyNickname())

  const roomNames = [
    { room_id: '', room_name: '' },
    { room_id: 'archives', room_name: 'Archives' },
    { room_id: 'armory', room_name: 'Armory' },
    { room_id: 'bottomless_pit', room_name: 'Bottomless Pit' },
    { room_id: 'dungeon', room_name: 'Dungeon' },
    { room_id: 'dynamite_room', room_name: 'Dynamite Room' },
    { room_id: 'great_hall', room_name: 'Great Hall' },
    { room_id: 'guest_bedroom', room_name: 'Guest Bedroom' },
    { room_id: 'kitchen', room_name: 'Kitchen' },
    { room_id: 'laboratory', room_name: 'Laboratory' },
    { room_id: 'observatory', room_name: 'Observatory' },
    { room_id: 'panic_room', room_name: 'Panic Room' },
    { room_id: 'parlor', room_name: 'Parlor' },
    { room_id: 'secret_passage', room_name: 'Secret Passage' },
    { room_id: 'sitting_room', room_name: 'Sitting Room' },
    { room_id: 'staff_quarters', room_name: 'Staff Quarters' },
    { room_id: 'study', room_name: 'Study' },
    { room_id: 'venus_grotto', room_name: 'Venus Grotto' },
    { room_id: 'workshop', room_name: 'Workshop' }
  ]

  const presetCards = [
    { label: 'Easy for 5', value: 'easy_5' },
    { label: 'Medium for 6', value: 'medium_6' },
    { label: 'Challenging for 7', value: 'challenging_7' },
    { label: 'Hard to 8', value: 'hard_8' },
    { label: 'Hard to 9', value: 'hard_9' },
    { label: 'Hard to 10', value: 'hard_10' },
    { label: 'Extreme for 11', value: 'extreme_11' },
    { label: 'Impossible for 12', value: 'impossible_12' }
  ]

  const handleRoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoomId = event.target.value
    setSelectedRoom(selectedRoomId)
  }

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (/^[a-zA-Z0-9]*$/.test(value) && value.length <= 20) {
      setNickname(value)
    }
  }

  const regenerateNickname = () => {
    setNickname(generateFunnyNickname())
  }

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault()
    localStorage.setItem('nickname', nickname)
    console.log(nickname)
  }

  const handlePresetClick = (presetValue: string) => {
    console.log(`Preset selected: ${presetValue}`)
  }

  return lobbyStore.isLoading ? (
    <div>Loading...</div>
  ) : lobbyStore.errorMessage ? (
    <div>{lobbyStore.errorMessage}</div>
  ) : (
    <StyledLobbyy>
      <Selection>
        <FormContainer onSubmit={handleLogin}>
          <Label>
            Nickname:
            <Input
              type="text"
              name="nickname"
              placeholder="Enter your nickname"
              value={nickname}
              onChange={handleNicknameChange}
              required
              maxLength={20}
              pattern="[a-zA-Z0-9]*"
              title="Nickname can only contain letters and numbers, and must be 20 characters or fewer."
            />
            <ButtonB type="button" onClick={regenerateNickname}>
              New Nickname
            </ButtonB>
          </Label>
          <Label>
            Room:
            <Select name="room" onChange={handleRoomChange} required>
              {roomNames.map(room => (
                <option key={room.room_id} value={room.room_id} style={{ color: '#333' }}>
                  {room.room_name}
                </option>
              ))}
            </Select>
          </Label>
          <ButtonB type="submit">Join</ButtonB>
        </FormContainer>

        <RoomBackground img={selectedRoom ? `/assets/rooms/${selectedRoom}.webp` : ''}>
          {selectedRoom ? null : <p>No room selected</p>}
        </RoomBackground>
      </Selection>
      <h2>Preset Cards</h2>
      <ButtonGroup>
        {presetCards.map(preset => (
          <Button key={preset.value} onClick={() => handlePresetClick(preset.value)} buttonText={preset.label} variant="primary" />
        ))}
      </ButtonGroup>
    </StyledLobbyy>
  )
})
