import { ARRIVE_ROOM, HYDRATE_ROOM, LEAVE_ROOM, REDIRECT, STAGES, TEAM } from 'constant'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deckStore, roomStore, wsStore } from 'store'
import { Expansion } from 'types'

export const useRoom = () => {
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
        room_id
      })
    }
  }, [sendJsonMessage, firstTime, room_id, token])

  useEffect(() => {
    if (lastJsonMessage?.type === HYDRATE_ROOM && lastJsonMessage?.success) {
      deckStore.setSelectedCard(lastJsonMessage.selected_cards)
      deckStore.setSelectedExpansions(lastJsonMessage.selected_expansions as Expansion[])
      roomStore.setRoomPlayers(lastJsonMessage.players)
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

  const teamArray = useMemo(() => [...new Set(deck.map(card => (card.team === TEAM.hero || card.team === TEAM.village ? TEAM.village : card.team)))], [deck])

  const orderedTeams = useMemo(() => roomStore.getOrderedTeams(teamArray), [roomStore, teamArray])

  const anchorList = orderedTeams.map(team => roomStore.getTeamName(roomStore.getSortedCardsByTeam(team), team).replace(/\b\w/g, l => l.toUpperCase()))

  return { orderedTeams, anchorList }
}
