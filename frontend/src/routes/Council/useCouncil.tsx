import { ARRIVE_COUNCIL, HYDRATE_COUNCIL, HYDRATE_GUESS, HYDRATE_READY, HYDRATE_VOTE, REDIRECT, VOTE } from 'constants'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { playersStore, propStore, riseAndRestStore, voteStore, wsStore } from 'store'
import { InteractionType } from 'types'
import { splitCardsToTable } from 'utils'

export const useCouncil = () => {
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()

  const { sendJsonMessage, lastJsonMessage } = wsStore.getWsCommunicationsBridge()

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage?.({
        type: ARRIVE_COUNCIL,
        room_id,
        token
      })
    }
  }, [sendJsonMessage, firstTime])

  useEffect(() => {
    if (lastJsonMessage?.type === HYDRATE_COUNCIL && lastJsonMessage?.success) {
      propStore.setInteraction(lastJsonMessage?.action as InteractionType)
      playersStore.setPlayer(lastJsonMessage.player)
      playersStore.setPlayers(lastJsonMessage.players)
      riseAndRestStore.openYourEyes(lastJsonMessage)
      voteStore.setNarrations(lastJsonMessage.narrations)
      voteStore.setIsGuessing(true)
      voteStore.setGuessCards(lastJsonMessage.guess_cards)
    }

    if (lastJsonMessage?.type === VOTE && lastJsonMessage?.success) {
      playersStore.setPlayer(lastJsonMessage.player)
      playersStore.setPlayers(lastJsonMessage.players)
      voteStore.setNarrations(lastJsonMessage.narrations)
      voteStore.resetGuesses()
      riseAndRestStore.openYourEyes(lastJsonMessage)
    }

    if (lastJsonMessage?.type === HYDRATE_GUESS && lastJsonMessage?.success) {
      voteStore.setIsGuessing(true)
      voteStore.setGuessedCards(lastJsonMessage.guessed_cards)
      voteStore.setGuessCards(lastJsonMessage.guess_cards)
    }

    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }

    if (lastJsonMessage?.type === HYDRATE_READY) {
      playersStore.setPlayers(lastJsonMessage.players)
    }

    if (lastJsonMessage?.type === HYDRATE_VOTE && lastJsonMessage?.success) {
      propStore.setEnd(true)
      riseAndRestStore.closeYourEyes()
    }
  }, [lastJsonMessage, navigate])

  const { tablePlayerCards, tablePlayerCard } = riseAndRestStore

  const sides = tablePlayerCards && tablePlayerCard ? splitCardsToTable(tablePlayerCards, tablePlayerCard) : null
  const { left = [], middle = [], right = [], ownCard } = sides || {}

  return { tablePlayerCards, tablePlayerCard, left, middle, right, ownCard }
}
