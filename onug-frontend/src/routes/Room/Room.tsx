import { CardList, TokenList } from 'components'
import {
  ARRIVE_ROOM,
  HYDRATE_ROOM,
  LEAVE_ROOM,
  TO_GAME_TABLE,
  REDIRECT,
  STAGES,
  team,
} from 'constant'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'
import { deckStore, roomStore, selectedDeckStore, wsStore } from 'store'
import { Main } from './Room.styles'
import { RoomFooter } from './RoomFooter'
import { RoomHeader } from './RoomHeader'
import { useNavigate } from 'react-router-dom'

export const Room: React.FC = observer(() => {
  const { deck } = deckStore
  const [firstTime, setFirstTime] = useState(true)

  const { sendJsonMessage, lastJsonMessage } =
    wsStore.getWsCommunicationsBridge()
  const navigate = useNavigate()

  useEffect(() => {
    if (firstTime) {
      setFirstTime(false)
      sendJsonMessage?.({
        type: ARRIVE_ROOM,
        stage: STAGES.ROOM,
        room_id: sessionStorage.getItem('room_id'),
      })
    }
  }, [sendJsonMessage, firstTime])

  useEffect(() => {
    if (lastJsonMessage?.type === HYDRATE_ROOM && lastJsonMessage?.success) {
      selectedDeckStore.setSelectedCard(lastJsonMessage.selected_cards)
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

    if (lastJsonMessage?.type === TO_GAME_TABLE) {
      if (lastJsonMessage.success) {
        sessionStorage.setItem('player_card_id', lastJsonMessage.player_card_id)
        sessionStorage.setItem('player_number', lastJsonMessage.player_number)

        roomStore.resetDetailedCardInfo()
        selectedDeckStore.addCardIdsToArray()
        navigate(`/gametable/${lastJsonMessage.room_id}`)
      } else {
        console.error(lastJsonMessage.errors)
      }
    }
  }, [lastJsonMessage])

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
    <>
      <RoomHeader />
      <Main>
        {orderedTeams.map((teamName) => (
          <CardList
            key={teamName}
            team={teamName}
            cards={roomStore.getFilteredCardsForTeam(teamName)}
          />
        ))}
        <TokenList />
      </Main>
      <RoomFooter />
    </>
  )
})
