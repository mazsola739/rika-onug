import { ARRIVE_VOTE, HYDRATE_READY, HYDRATE_VOTE, REDIRECT, STAGES } from 'constant'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deckStore, playersStore, riseAndRestStore, voteStore, wsStore } from 'store'
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
      playersStore.setPlayers(lastJsonMessage.players)
      voteStore.setKnownPlayerCard()
      voteStore.setKnownPlayerMark()
      riseAndRestStore.openYourEyes(lastJsonMessage)
    }

    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }

    if (lastJsonMessage?.type === HYDRATE_READY) {
      playersStore.setPlayers(lastJsonMessage.players)
    }
  }, [
    lastJsonMessage,
    playersStore.setPlayer,
    playersStore.setPlayers,
    navigate,
  ])
  
  
  const { tablePlayerCards, tablePlayerCard } = riseAndRestStore

  const sides =
    tablePlayerCards && tablePlayerCard
      ? splitCardsToTable(tablePlayerCards, tablePlayerCard)
      : null
  const { left = [], middle = [], right = [] } = sides || {}


/*   useEffect(() => {
    if (!lastJsonMessage?.player.player_history) return
    setHistory(
      Object.keys(lastJsonMessage.player.player_history).length === 0
        ? 'You have slept through the night'
        : JSON.stringify(lastJsonMessage.player.player_history)
    )
  }, [lastJsonMessage]) */

  return { tablePlayerCards, tablePlayerCard, left, middle, right }
}
