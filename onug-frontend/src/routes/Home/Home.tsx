import { CardList, TokenList } from 'components'
import { team } from 'constant'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { useEffect, useMemo } from 'react'
import { Main } from './Home.styles'
import { HomeProps } from './Home.types'
import { HomeFooter } from './HomeFooter'
import { HomeHeader } from './HomeHeader'
import { selectedDeckStore } from 'store'

export const Home = observer(({ deckStore }: HomeProps) => {
  const { deck } = deckStore

  useEffect(() => {
    const timer = setInterval(async () => {
      try {
        const requestBody = {
          route: 'hydrate-select',
          roomId: '196603ee-d534-4c2f-8561-7005a3617e2c',
        }

        const response = await fetch('http://localhost:7654/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })

        const responseData = await response.json()
        selectedDeckStore.updateSelectedCards(
          responseData.gameState.selectedCards
        )
        console.log('Response from backend:', responseData)
      } catch (error) {
        console.error('Error sending ready request:', error)
      }
    }, 5000)

    return () => {
      clearInterval(timer)
    }
  }, [])

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
      <HomeHeader />
      <Main>
        {orderedTeams.map((teamName) => (
          <CardList
            key={teamName}
            team={teamName}
            cards={deckStore.getFilteredCardsForTeam(teamName)}
          />
        ))}
        <TokenList />
      </Main>
      <HomeFooter />
    </>
  )
})
