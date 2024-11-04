import { ARRIVE_VOTE, HYDRATE_READY, HYDRATE_VOTE, REDIRECT, RESULT, STAGES, VOTE } from 'constant'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { playersStore, riseAndRestStore, voteStore, wsStore } from 'store'
import { splitCardsToTable } from 'utils'

export const useVote = () => {
  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()

  const { sendJsonMessage, lastJsonMessage } = wsStore.getWsCommunicationsBridge()

  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage?.({
        type: ARRIVE_VOTE,
        stage: STAGES.VOTING,
        room_id,
        token,
      })
    }
  }, [sendJsonMessage, firstTime])

  useEffect(() => {
    if (lastJsonMessage?.type === HYDRATE_VOTE && lastJsonMessage?.success) {
      voteStore.setKnownPlayer(lastJsonMessage.player)
      voteStore.setNarrations(lastJsonMessage.narrations)
      playersStore.setPlayers(lastJsonMessage.players)
    }

    if (lastJsonMessage?.type === VOTE) {
      voteStore.setKnownPlayer(lastJsonMessage.player)
      voteStore.setNarrations(lastJsonMessage.narrations)
      playersStore.setPlayers(lastJsonMessage.players)
      riseAndRestStore.openYourEyes(lastJsonMessage)
    }

    if (lastJsonMessage?.type === RESULT) {
      riseAndRestStore.openYourEyes(lastJsonMessage)
      riseAndRestStore.setTablePlayerCard(lastJsonMessage)
    }

    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }

    if (lastJsonMessage?.type === HYDRATE_READY) {
      playersStore.setPlayers(lastJsonMessage.players)
    }
  }, [lastJsonMessage, navigate])
  
  
  const { tablePlayerCards, tablePlayerCard } = riseAndRestStore

  const sides =
    tablePlayerCards && tablePlayerCard
      ? splitCardsToTable(tablePlayerCards, tablePlayerCard)
      : null
  const { left = [], middle = [], right = [], ownCard } = sides || {}

  return { tablePlayerCards, tablePlayerCard, left, middle, right, ownCard }
}
