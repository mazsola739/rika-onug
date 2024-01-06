import { GameCard, GameToken } from 'components'
import {
  CardContainer,
  PlayersCards,
  CardTitle,
  CenterCards,
  Marks,
} from './GameTable.styles'
import { CardType, MarkType, PlayerType, TokenType } from 'types'

const renderPlayers = (players: PlayerType[]) => (
  <CardContainer>
    <PlayersCards>
      {players.map((player) => (
        <GameCard key={player.player_number} player={player} isCenter={false} />
      ))}
    </PlayersCards>
  </CardContainer>
)

const renderCenterCard = (title: string, cards: CardType[]) => (
  <CardContainer>
    <CardTitle>{title}</CardTitle>
    <CenterCards>
      {cards.map((card, i) => (
        <GameCard key={i} isCenter={true} />
      ))}
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

const renderMarks = (selectedMarks: MarkType[], hasDoppelganger: boolean) => (
  <Marks>
    {selectedMarks.map((mark) => (
      <GameToken
        key={mark.id}
        tokenName={mark.token_name}
        isInDeck={mark.is_in_deck}
        display_name={mark.display_name}
        hasDoppelganger={hasDoppelganger}
      />
    ))}
  </Marks>
)

const renderArtifacts = (artifacts: TokenType[]) => (
  <Marks>
    {artifacts.map(
      (artifact, i) =>
        artifact.token_name !== 'shield' && (
          <img
            key={i}
            style={{ width: '60px' }}
            src={require(`../../assets/tokens/${artifact.token_name}.png`)}
            alt={artifact.token_name}
          />
        )
    )}
  </Marks>
)

const getRandomPlayer = (players: PlayerType[]): PlayerType => {
  const randomIndex = Math.floor(Math.random() * players.length)
  return players[randomIndex]
}

export const gameTableUtils = {
  renderPlayers,
  renderCenterCard,
  renderCenterExtraCard,
  renderMarks,
  renderArtifacts,
  getRandomPlayer,
}
