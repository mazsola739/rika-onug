import { CardList, Filter, Footer, Header, TokenList } from 'components'
import { observer } from 'mobx-react-lite'
import { useCallback, useMemo } from 'react'
import { deckStore, gamePlayStore, selectedDeckStore } from 'store'
import {
  ResetButton,
  StartButton,
  StyledGameButtons,
  StyledLogo,
  StyledMain,
  StyledRuleInfo,
  StyledSelectedCard,
  StyledSelectedCardList,
} from './Home.styles'
import { HomeProps, SelectedCardProps } from './Home.types'
import { buttons, team } from 'constant'
import { logo_en_1 } from 'assets'
import { Link } from 'react-router-dom'

const SelectedCard = ({ src, alt, id }: SelectedCardProps & { id: number }) => {
  const handleDeselect = () => {
    selectedDeckStore.toggleCardSelection({
      id,
      display_name: alt,
      expansion: '',
      team: '',
      wake_up_time: '',
      card_name: '',
      order: 0,
      rules: '',
    })
  }

  return (
    <StyledSelectedCard
      key={alt}
      src={src}
      alt={alt}
      onClick={handleDeselect}
    />
  )
}

const SelectedCardList = observer(() => {
  const { selectedCards } = selectedDeckStore

  return (
    <StyledSelectedCardList>
      {selectedCards.map((card) => (
        <SelectedCard
          key={card.id}
          src={require(`../../assets/cards/${card.card_name}.png`)}
          alt={card.display_name}
          id={card.id}
        />
      ))}
    </StyledSelectedCardList>
  )
})

const GameButtons = observer(() => {
  const handleResetGame = useCallback(() => {
    gamePlayStore.resetGame()
  }, [])

  const handleStartGame = useCallback(() => {
    gamePlayStore.toggleGameStatus()
    deckStore.resetDetailedCardInfo()
  }, [])

  const totalPlayers = selectedDeckStore.totalPlayers
  const buttonText = totalPlayers
    ? `${buttons.play_game_text}${totalPlayers}`
    : buttons.play_game_text

  return (
    <StyledGameButtons>
      <ResetButton onClick={handleResetGame}>
        {buttons.reset_game_label}
      </ResetButton>
      <Link to="/room">
        <StartButton
          onClick={handleStartGame}
          disabled={!selectedDeckStore.totalPlayers}
        >
          {buttonText}
        </StartButton>
      </Link>
    </StyledGameButtons>
  )
})

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
      <StyledMain>
        {orderedTeams.map((teamName) => (
          <CardList
            key={teamName}
            team={teamName}
            cards={deckStore.getFilteredCardsForTeam(teamName)}
          />
        ))}
        <TokenList />
      </StyledMain>
      <Footer>
        <GameButtons />
        <SelectedCardList />
      </Footer>
    </>
  )
})
