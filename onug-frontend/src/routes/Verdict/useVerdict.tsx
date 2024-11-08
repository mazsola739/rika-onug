import { ARRIVE_VERDICT, HYDRATE_GUESS, HYDRATE_READY, HYDRATE_VOTE, REDIRECT, RESULT, STAGES, VOTE } from 'constant'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { playersStore, propStore, riseAndRestStore, voteStore, wsStore } from 'store'

export const useVerdict = () => {
  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()

  const { sendJsonMessage, lastJsonMessage } = wsStore.getWsCommunicationsBridge()

  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage?.({
        type: ARRIVE_VERDICT,
        stage: STAGES.VERDICT,
        room_id,
        token
      })
    }
  }, [sendJsonMessage, firstTime])

  useEffect(() => {
    if (lastJsonMessage?.type === HYDRATE_VOTE && lastJsonMessage?.success) {
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

  const { players } = playersStore
  const disabled = players.some(player => player.flag === false)

  return { disabled }
}
