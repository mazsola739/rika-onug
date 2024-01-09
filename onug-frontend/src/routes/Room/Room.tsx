import { CardList, TokenList } from 'components'
import { team } from 'constant'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { deckStore, selectedDeckStore } from 'store'
import { Main } from './Room.styles'
import { RoomProps } from './Room.types'
import { RoomFooter } from './RoomFooter'
import { RoomHeader } from './RoomHeader'
import { hydrateSelectRequest } from 'api'

export const Room = observer(({ roomStore }: RoomProps) => {
  const { deck } = deckStore

  const { room_id } = useParams()

  useEffect(() => {
    const timer = setInterval(async () => {
      try {
        const responseData = await hydrateSelectRequest(room_id)

        if (responseData.gameState && responseData.gameState.selected_cards) {
          selectedDeckStore.updateSelectedCards(
            responseData.gameState.selected_cards
          )
        } else {
          console.error(
            'gameState or selected_cards is undefined in the response'
          )
        }

        console.log('Response from backend:', responseData)
      } catch (error) {
        console.error('Error sending ready request:', error.message)
      }
    }, 5000)

    return () => {
      clearInterval(timer)
    }
  }, [room_id])

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
            room_id={room_id}
          />
        ))}
        <TokenList />
      </Main>
      <RoomFooter room_id={room_id} player_name={'Ron Weasley'} />
    </>
  )
})
