import { CardList, Filter, Header, TokenList } from 'components'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { StyledLogo, Main, StyledRuleInfo } from './Home.styles'
import { HomeProps } from './Home.types'
import { team } from 'constant'
import { logo_en_1 } from 'assets'
import { HomeFooter } from './HomeFooter'

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
      <Header>
        <StyledLogo src={logo_en_1} alt="header" />
        <Filter />
        <StyledRuleInfo />
      </Header>
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
