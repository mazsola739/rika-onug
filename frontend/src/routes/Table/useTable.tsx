import { ARRIVE_TABLE, HYDRATE_READY, HYDRATE_TABLE, REDIRECT } from 'constant'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deckStore, playersStore, riseAndRestStore, wsStore } from 'store'
import { splitCardsToTable } from 'utils'

export const useTable = () => {
  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()

  const token = sessionStorage.getItem('token')
  const room_id = sessionStorage.getItem('room_id')

  const { sendJsonMessage, lastJsonMessage } = wsStore.getWsCommunicationsBridge()

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage({
        type: ARRIVE_TABLE,
        token,
        room_id
      })
    }
  }, [sendJsonMessage, firstTime, room_id, token])

  useEffect(() => {
    if (lastJsonMessage?.type === HYDRATE_TABLE && lastJsonMessage?.success) {
      playersStore.setPlayer(lastJsonMessage.player)
      playersStore.setPlayers(lastJsonMessage.players)
      deckStore.setPlayerCard()
      deckStore.setPlayerMark()
      riseAndRestStore.openYourEyes(lastJsonMessage)
      riseAndRestStore.setTablePlayerCard(lastJsonMessage)
    }

    if (lastJsonMessage?.type === HYDRATE_READY) {
      playersStore.setPlayers(lastJsonMessage.players)
    }

    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }
  }, [lastJsonMessage, navigate])

  const { tablePlayerCards, tablePlayerCard } = riseAndRestStore

  const sides = tablePlayerCards && tablePlayerCard ? splitCardsToTable(tablePlayerCards, tablePlayerCard) : null
  const { left = [], middle = [], right = [], ownCard } = sides || {}

  return { tablePlayerCards, tablePlayerCard, left, middle, right, ownCard }
}
