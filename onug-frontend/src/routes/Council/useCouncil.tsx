import { ARRIVE_COUNCIL, HYDRATE_COUNCIL, HYDRATE_GUESS, HYDRATE_READY, REDIRECT, RESULT, VOTE } from 'constant'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { playersStore, propStore, riseAndRestStore, voteStore, wsStore } from 'store'
import { splitCardsToTable } from 'utils'

export const useCouncil = () => {
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()

  const { sendJsonMessage, lastJsonMessage } = wsStore.getWsCommunicationsBridge()
  const { tablePlayerCards, tablePlayerCard } = riseAndRestStore

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
      voteStore.setKnownPlayer(lastJsonMessage.player)
      voteStore.setNarrations(lastJsonMessage.narrations)
      playersStore.setPlayers(lastJsonMessage.players)
      voteStore.setIsGuessing(true)
      voteStore.setGuessCards(lastJsonMessage.guess_cards)
    }

    if (lastJsonMessage?.type === HYDRATE_GUESS && lastJsonMessage?.success) {
      voteStore.setIsGuessing(true)
      voteStore.setGuessedCards(lastJsonMessage.guessed_cards)
      voteStore.setGuessCards(lastJsonMessage.guess_cards)
    }

    if (lastJsonMessage?.type === VOTE) {
      voteStore.setKnownPlayer(lastJsonMessage.player)
      voteStore.setNarrations(lastJsonMessage.narrations)
      playersStore.setPlayers(lastJsonMessage.players)
      voteStore.resetGuesses()
      riseAndRestStore.openYourEyes(lastJsonMessage)
    }

    if (lastJsonMessage?.type === RESULT) {
      propStore.setEnd(true)
      riseAndRestStore.openYourEyes(lastJsonMessage)
      riseAndRestStore.setTablePlayerCard(lastJsonMessage)
      propStore.setVoteResult(lastJsonMessage.vote_result)
      propStore.setWinnerTeams(lastJsonMessage.winner_teams)
    }

    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }

    if (lastJsonMessage?.type === HYDRATE_READY) {
      playersStore.setPlayers(lastJsonMessage.players)
    }
  }, [lastJsonMessage, navigate])

  const sides = tablePlayerCards && tablePlayerCard ? splitCardsToTable(tablePlayerCards, tablePlayerCard) : null
  const { left = [], middle = [], right = [], ownCard } = sides || {}

  return { tablePlayerCards, tablePlayerCard, left, middle, right, ownCard }
}
