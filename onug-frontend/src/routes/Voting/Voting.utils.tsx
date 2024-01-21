import { GameCard } from 'components'
import {
  Players,
  PlayerNumber,
  Player,
  PlayerName,
  CardContainer,
  PlayersCards,
} from './Voting.styles'
import { PlayersType } from 'types'

const renderPlayers = (players: PlayersType[]) => (
  <Players>
    {players.map(({ player_name, player_number, ready }) => (
      <Player key={player_number}>
        <PlayerNumber
          src={
            ready
              ? `/assets/players/selected_player_${player_number}.png`
              : `/assets/players/player_${player_number}.png`
          }
          alt={`player_${player_number}`}
        />
        <PlayerName>{player_name}</PlayerName>
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

export const votingUtils = {
  renderPlayers,
  renderPlayerCards,
}
