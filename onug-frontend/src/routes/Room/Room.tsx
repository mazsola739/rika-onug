import { CardList, TokenList } from 'components'
import { HYDRATE_ROOM, STAGES, team } from 'constant'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'
import { deckStore, roomStore, selectedDeckStore, wsStore } from 'store'
import { Main } from './Room.styles'
import { RoomFooter } from './RoomFooter'
import { RoomHeader } from './RoomHeader'
import { useNavigate } from 'react-router-dom'

export const Room = observer(() => {
  const { deck } = deckStore
  const [firstTime, setFirstTime] = useState(true)

  const { sendJsonMessage, lastJsonMessage } =
    wsStore.getWsCommunicationsBridge()
  const navigate = useNavigate()
  const { redirectPath, setRedirectPath } = wsStore

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage({
        type: HYDRATE_ROOM,
        stage: STAGES.ROOM,
        room_id: sessionStorage.getItem('room_id'),
      })
    }
  }, [sendJsonMessage, firstTime])

  useEffect(() => {
    if (lastJsonMessage?.type === HYDRATE_ROOM && lastJsonMessage.success) {
      selectedDeckStore.setSelectedCard(lastJsonMessage.selected_cards)
    }
  }, [sendJsonMessage, lastJsonMessage])

  useEffect(() => {
    if (redirectPath && redirectPath !== window.location.pathname) {
      setTimeout(() => navigate(redirectPath), 0)
      setRedirectPath(undefined)
    }
  }, [redirectPath, setRedirectPath])

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
