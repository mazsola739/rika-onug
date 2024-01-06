import { CardList, TokenList } from 'components'
import { team } from 'constant'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo } from 'react'
import { Main } from './Room.styles'
import { RoomProps } from './Room.types'
import { RoomFooter } from './RoomFooter'
import { RoomHeader } from './RoomHeader'
import { selectedDeckStore } from 'store'
import { useParams } from 'react-router-dom'

export const Room = observer(({ deckStore }: RoomProps) => {
  const { deck } = deckStore

  const { room_id } = useParams()

  useEffect(() => {
    const timer = setInterval(async () => {
      try {
        const requestBody = {
          route: 'hydrate-select',
          room_id: room_id,
        }

        const response = await fetch('http://localhost:7654/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })

        const responseData = await response.json()

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
        console.error('Error sending ready request:', error)
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
    () => deckStore.getOrderedTeams(teamArray),
    [deckStore, teamArray]
  )

  return (
    <>
      <RoomHeader />
      <Main>
        {orderedTeams.map((teamName) => (
          <CardList
            key={teamName}
            team={teamName}
            cards={deckStore.getFilteredCardsForTeam(teamName)}
            room_id={room_id}
          />
        ))}
        <TokenList />
      </Main>
      <RoomFooter />
    </>
  )
})
