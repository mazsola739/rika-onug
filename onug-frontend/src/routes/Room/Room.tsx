import { CardList, TokenList } from 'components'
import { HYDRATE_SELECT, team } from 'constant'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { deckStore, selectedDeckStore } from 'store'
import { Main } from './Room.styles'
import { RoomProps } from './Room.types'
import { RoomFooter } from './RoomFooter'
import { RoomHeader } from './RoomHeader'

export const Room = observer(({ roomStore }: RoomProps) => {
  const { deck } = deckStore
  const { room_id } = useParams()
  const [firstTime, setFirstTime] = useState(true)

  const sendJsonMessage = roomStore.getSendJsonMessage()
  const lastJsonMessage = roomStore.getLastJsonMessage()

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      setInterval(
        () =>
          sendJsonMessage({
            type: HYDRATE_SELECT,
            room_id: sessionStorage.getItem('room_id'),
          }),
        1000
      )
    }
  }, [sendJsonMessage, firstTime])

  useEffect(() => {
    if (lastJsonMessage?.type === HYDRATE_SELECT) {
      selectedDeckStore.setSelectedCard(lastJsonMessage.selected_cards)
    }
  }, [sendJsonMessage, lastJsonMessage])

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
            room_id={room_id}
          />
        ))}
        <TokenList />
      </Main>
      <RoomFooter room_id={room_id} player_name={'Ron Weasley'} />
    </>
  )
})
