import { CardList, TokenList } from 'components'
import { AUTH, KEEP_ALIVE, team } from 'constant'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { deckStore } from 'store'
import { Main } from './Room.styles'
import { RoomProps } from './Room.types'
import { RoomFooter } from './RoomFooter'
import { RoomHeader } from './RoomHeader'
import useWebSocket, { ReadyState } from 'react-use-websocket'

export const Room = observer(({ roomStore }: RoomProps) => {
  const { deck } = deckStore
  const { room_id } = useParams()

  const [socketUrl] = useState('ws://localhost:7655/')
  const { readyState, sendJsonMessage, lastJsonMessage } =
    useWebSocket(socketUrl)

  useEffect(() => {
    if (sendJsonMessage) {
      roomStore.setSendJsonMessage(sendJsonMessage)
    }

    if (lastJsonMessage?.type !== KEEP_ALIVE) {
      if (lastJsonMessage?.type === AUTH) {
        sessionStorage.setItem('token', lastJsonMessage.token)
      }
      console.log(lastJsonMessage)
    }
  }, [sendJsonMessage, roomStore, lastJsonMessage])

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState]

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
        <span>The WebSocket is currently {connectionStatus}</span>
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
