import { CardList, Filter, Main } from 'components'
import {
  ARRIVE_ROOM,
  HYDRATE_ROOM,
  LEAVE_ROOM,
  REDIRECT,
  STAGES,
  team,
} from 'constant'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'
import { deckStore, roomStore, wsStore } from 'store'
import { RoomCardList, StyledRoom } from './Room.styles'
import { RoomFooter } from './RoomFooter'
import { RoomHeader } from './RoomHeader'
import { useNavigate } from 'react-router-dom'

export const Room: React.FC = observer(() => {
  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()

  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const { sendJsonMessage, lastJsonMessage } =
    wsStore.getWsCommunicationsBridge()
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
          card.team === team.hero || card.team === team.village
            ? team.village
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
            <CardList
              key={index}
              team={teamName}
              cards={roomStore.getFilteredCardsForTeam(teamName)}
            />
          ))}
        </RoomCardList>
      </Main>
      <RoomFooter />
    </StyledRoom>
  )
})
