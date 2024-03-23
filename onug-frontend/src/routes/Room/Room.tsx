import { Main, Filter, CardList } from 'components'
import { ARRIVE_ROOM, STAGES, HYDRATE_ROOM, REDIRECT, LEAVE_ROOM, TEAM } from 'constant'
import { observer } from 'mobx-react-lite'
import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { wsStore, deckStore, roomStore } from 'store'
import { StyledRoom, RoomCardList } from './Room.styles'
import { RoomFooter } from './RoomFooter'
import { RoomHeader } from './RoomHeader'

export const Room: React.FC = observer(() => {
  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()

  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const { sendJsonMessage, lastJsonMessage } = wsStore.getWsCommunicationsBridge()
  const { deck } = deckStore

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage?.({
        type: ARRIVE_ROOM,
        stage: STAGES.ROOM,
        token,
        room_id,
      })
    }
  }, [sendJsonMessage, firstTime])

  useEffect(() => {
    if (lastJsonMessage?.type === HYDRATE_ROOM && lastJsonMessage?.success) {
      deckStore.setSelectedCard(lastJsonMessage.selected_cards)
      deckStore.setSelectedExpansions(lastJsonMessage.selected_expansions)
    }

    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }

    if (lastJsonMessage?.type === LEAVE_ROOM) {
      if (lastJsonMessage.success) {
        sessionStorage.setItem('room_id', '')
        sessionStorage.setItem('player_name', '')
        navigate('/lobby')
      } else {
        console.error(lastJsonMessage.errors)
      }
    }
  }, [lastJsonMessage, navigate])

  const teamArray = useMemo(
    () => [
      ...new Set(
        deck.map((card) =>
          card.team === TEAM.hero || card.team === TEAM.village
            ? TEAM.village
            : card.team
        )
      ),
    ],
    [deck]
  )

  const orderedTeams = useMemo(
    () => roomStore.getOrderedTeams(teamArray),
    [roomStore, teamArray]
  )

  return (
    <StyledRoom>
      <RoomHeader />
      <Main>
        <Filter />
        <RoomCardList>
          {orderedTeams.map((teamName, index) => (
            <CardList key={index} team={teamName} cards={roomStore.getSortedCardsByTeam(teamName)} />
          ))}
        </RoomCardList>
      </Main>
      <RoomFooter />
    </StyledRoom>
  )
})
