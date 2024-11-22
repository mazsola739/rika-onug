import { ALIENS, ARRIVE_GAME, END_GAME, HYDRATE_GAME, REDIRECT, SCENE, VAMPIRES } from 'constant'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gameStatusStore, messageStore, propStore, riseAndRestStore, wsStore } from 'store'
import { NarrationType, MessagesType } from 'types'
import { splitCardsToTable } from 'utils'

export const useGame = () => {
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const [firstTime, setFirstTime] = useState(true)
  const [transitionCompleted, setTransitionCompleted] = useState(false)

  const navigate = useNavigate()

  const { sendJsonMessage, lastJsonMessage } = wsStore.getWsCommunicationsBridge()

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage?.({
        type: ARRIVE_GAME,
        room_id,
        token
      })
    }
  }, [sendJsonMessage, firstTime, room_id, token])

  useEffect(() => {
    if (transitionCompleted && propStore.nightfall) {
      sendJsonMessage?.({ type: SCENE, room_id, token, night_ready: true })
      setTransitionCompleted(false)
    }
    if (transitionCompleted && propStore.sunrise) {
      sendJsonMessage?.({ type: SCENE, room_id, token, day_ready: true })
      setTransitionCompleted(false)
    }
  }, [sendJsonMessage, transitionCompleted])

  useEffect(() => {
    if (lastJsonMessage?.type === SCENE && lastJsonMessage?.success) {
      riseAndRestStore.openYourEyes(lastJsonMessage)
      messageStore.setNarration(lastJsonMessage.narration as NarrationType[])
      messageStore.setPrivateMessage(lastJsonMessage.action.private_message as MessagesType[])
    }

    if (lastJsonMessage?.type === HYDRATE_GAME && lastJsonMessage?.success) {
      riseAndRestStore.closeYourEyes()
      propStore.setNightfall(lastJsonMessage.night_mode)
    }
    if (lastJsonMessage?.type === END_GAME && lastJsonMessage?.success) {
      riseAndRestStore.closeYourEyes()
      propStore.setSunrise(lastJsonMessage.day_mode)
    }

    if (lastJsonMessage?.type === VAMPIRES && lastJsonMessage?.success) {
      propStore.setVampireVotes(lastJsonMessage.vampire_votes)
    }
    if (lastJsonMessage?.type === ALIENS && lastJsonMessage?.success) {
      propStore.setAlienVotes(lastJsonMessage.alien_votes)
    }

    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }
  }, [lastJsonMessage, navigate])

  const { tablePlayerCards, tablePlayerCard } = riseAndRestStore

  const sides = tablePlayerCards && tablePlayerCard ? splitCardsToTable(tablePlayerCards, tablePlayerCard) : null
  const { left = [], middle = [], right = [], ownCard } = sides || {}

  return {
    tablePlayerCards,
    tablePlayerCard,
    left,
    middle,
    right,
    ownCard,
    setTransitionCompleted
  }
}
