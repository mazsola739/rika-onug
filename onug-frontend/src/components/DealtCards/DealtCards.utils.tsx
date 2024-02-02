import { GameCard } from 'components'
import {
  CardContainer,
  PlayersCards,
  CardTitle,
  CenterCards,
} from './DealtCards.styles'
import { PlayersType } from 'types'

const renderPlayerCards = (players: PlayersType[]) => (
  <CardContainer>
    <PlayersCards>
      {players.map(({ player_number, ready }) => (
        <GameCard
          key={player_number}
          player_number={player_number}
          ready={ready}
          isCenter={false}
        />
      ))}
    </PlayersCards>
  </CardContainer>
)

const renderCenterCard = (title: string) => (
  <CardContainer>
    <CardTitle>{title}</CardTitle>
    <CenterCards>
      <GameCard isCenter={true} />
      <GameCard isCenter={true} />
      <GameCard isCenter={true} />
    </CenterCards>
  </CardContainer>
)

const renderCenterExtraCard = (title: string) => (
  <CardContainer>
    <CardTitle>{title}</CardTitle>
    <CenterCards>
      <GameCard isCenter={true} />
    </CenterCards>
  </CardContainer>
)

export const dealtCardsUtils = {
  renderPlayerCards,
  renderCenterCard,
  renderCenterExtraCard,
}
