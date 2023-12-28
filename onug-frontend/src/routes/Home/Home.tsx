import { CardList, TokenList } from 'components'
import { team } from 'constant'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { Main } from './Home.styles'
import { HomeProps } from './Home.types'
import { HomeFooter } from './HomeFooter'
import { HomeHeader } from './HomeHeader'

export const Home = observer(({ deckStore }: HomeProps) => {
  const { deck } = deckStore

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
