import { DealtToken } from "components"
import { PlayersType, PlayerType, TokenType } from "types"
import { Marks } from "./Table.styles"

const renderTokens = (
  artifacts: TokenType[],
  hasCurator: boolean,
  hasSentinel: boolean,
  selectedMarks: TokenType[],
) => (
  <Marks>
    {hasSentinel && <DealtToken tokenName="shield" size={55} />}
      {selectedMarks.map((mark, index) => (
      <DealtToken key={index} tokenName={mark.token_name} size={55} />
    ))}
    {hasCurator &&
      artifacts.map(
        (artifact, index) =>
          artifact.token_name !== 'shield' && (
            <DealtToken key={index} tokenName={artifact.token_name} size={55} />
          )
      )}
  </Marks>
)

const splitPlayersToLeftAndRightSide = (players: PlayersType[], player: PlayerType) => {
  const middleIndex = Math.floor(players.length / 2)
  const playerIndex = player.player_number - 1
  const difference = middleIndex - playerIndex
  
  let newPlayers = [...players]
  
  if (difference > 0) {
    const shiftPart = newPlayers.slice(-difference)
    newPlayers = [...shiftPart, ...newPlayers.slice(0, newPlayers.length - difference)]
  } else if (difference < 0) {
    const shiftPart = newPlayers.slice(0, -difference)
    newPlayers = [...newPlayers.slice(-difference), ...shiftPart]
  }

  const left = newPlayers.slice(0, middleIndex)
  const right = newPlayers.slice(middleIndex + 1).reverse()
  
  return { left, right }
}

export const tableUtils = {
  renderTokens,
  splitPlayersToLeftAndRightSide
}
