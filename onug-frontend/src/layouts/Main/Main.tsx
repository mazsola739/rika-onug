import { CardList, TokenList } from 'components'
import { Room } from 'layouts'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { selectedDeckStore } from 'store'
import { StyledMain } from './Main.styles'
import { MainProps } from './Main.types'

export const Main = observer(({ deckStore }: MainProps) => {
  const { deck } = deckStore

  const teamArray = [
    ...new Set(
      deck.map((card) =>
        card.team === 'hero' || card.team === 'village' ? 'village' : card.team
      )
    ),
  ]

  const orderedTeams = useMemo(
    () => deckStore.getOrderedTeams(teamArray),
    [deckStore, teamArray]
  )

  return (
    <StyledMain>
      {selectedDeckStore.isGameStarted ? (
        <Room />
      ) : (
        <>
          {orderedTeams.map((teamName) => (
            <CardList
              key={teamName}
              team={teamName}
              cards={deckStore.getFilteredCardsForTeam(teamName)}
            />
          ))}
          <TokenList />
        </>
      )}
    </StyledMain>
  )
})
