import { CardList, TokenList } from 'components'
import { HYDRATE_SELECT, team } from 'constant'
import { observer } from 'mobx-react-lite'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { deckStore, roomStore, selectedDeckStore, wsStore } from 'store'
import { Main } from './Room.styles'
import { RoomFooter } from './RoomFooter'
import { RoomHeader } from './RoomHeader'

export const Room = observer(() => {
  const { deck } = deckStore
  const [firstTime, setFirstTime] = useState(true)
  const intervalIdRef = useRef(null)

  const { sendJsonMessage, lastJsonMessage } =
    wsStore.getWsCommunicationsBridge()

  const startHydrateSelectInterval = useCallback(
    (sendJsonMessage: (arg0: { type: string; room_id: string }) => void) => {
      intervalIdRef.current = setInterval(
        () =>
          sendJsonMessage({
            type: HYDRATE_SELECT,
            room_id: sessionStorage.getItem('room_id'),
          }),
        1000
      )
    },
    []
  )

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      startHydrateSelectInterval(sendJsonMessage)
    }
  }, [sendJsonMessage, firstTime, intervalIdRef.current])

  useEffect(() => {
    return () => clearInterval(intervalIdRef.current)
  }, [])

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
          />
        ))}
        <TokenList />
      </Main>
      <RoomFooter />
    </>
  )
})
