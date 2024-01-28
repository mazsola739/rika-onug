import { GameCard, GameToken } from 'components'
import {
  CardContainer,
  PlayersCards,
  CardTitle,
  CenterCards,
  Marks,
  Players,
  PlayerReadyName,
  PlayerReadyNumber,
  Player,
  OwnKnownCardContainer,
  OwnKnownCardImage,
  OwnKnownCardText,
} from './GameTable.styles'
import { MarkType, PlayerType, PlayersType, TokenType } from 'types'

const renderOwnCard = (player: PlayerType) => (
  <OwnKnownCardContainer>
    <OwnKnownCardText>
      Player {player.player_number} : {player.player_name}
    </OwnKnownCardText>
    <OwnKnownCardImage
      src={`/assets/cards/${player.player_card.card_name}.png`}
      alt={player.player_card.display_name}
    ></OwnKnownCardImage>
    <OwnKnownCardText>Team: {player.player_card.team}</OwnKnownCardText>
    <OwnKnownCardText>Role: {player.player_card.display_name}</OwnKnownCardText>
  </OwnKnownCardContainer>
)

const renderPlayers = (players: PlayersType[]) => (
  <Players>
    {players.map(({ player_name, ready, player_number }) => (
      <Player key={player_number}>
        <PlayerReadyNumber
          ready={ready}
          src={
            ready
              ? `/assets/players/selected_player_${player_number}.png`
              : `/assets/players/player_${player_number}.png`
          }
          alt={`player_${player_number}`}
        />
        <PlayerReadyName ready={ready}>
          {player_name} is {ready ? 'ready' : 'not ready'}
        </PlayerReadyName>
      </Player>
    ))}
  </Players>
)

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

const renderMarks = (selectedMarks: MarkType[]) => (
  <Marks>
    {selectedMarks.map(
      (mark) =>
        mark.is_in_deck && (
          <GameToken
            key={mark.id}
            tokenName={mark.token_name}
            display_name={mark.display_name}
          />
        )
    )}
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
            src={`/assets/tokens/${artifact.token_name}.png`}
            alt={artifact.token_name}
          />
        )
    )}
  </Marks>
)

export const gameTableUtils = {
  renderOwnCard,
  renderPlayers,
  renderPlayerCards,
  renderCenterCard,
  renderCenterExtraCard,
  renderMarks,
  renderArtifacts,
}
