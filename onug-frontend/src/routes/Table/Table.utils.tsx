import { DealtToken } from "components"
import { PlayersType, PlayerType, TokenType } from "types"
import { Marks } from "./Table.styles"
import { deckStore, gameBoardStore } from "store"

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

/* const splitPlayersToLeftAndRightSide = () => {
  const {  player } = gameBoardStore

  if (!player || player.player_number === undefined) {
    return { left: [], right: [] }
  }

  const playerNumber = player.player_number
  const index = playerNumber - 1
  const totalPlayers = players.length

  const left: PlayersType[] = []
  const right: PlayersType[] = []

  for (let i = 1; i <= Math.floor(totalPlayers / 2); i++) {
    right.push(players[(index + i) % totalPlayers])
    left.push(players[(index - i + totalPlayers) % totalPlayers])
  }

  left.reverse()
  right.reverse()

  return { left, right }
}

const playersOnMySide = splitPlayersToLeftAndRightSide()
const { left, right } = playersOnMySide

const renderLeftSide = () => {(
    <div>
    {left.map(({player_number}) => (
      <img
        key={player_number}
        src="/assets/playingcards/card_background.png"
        alt={player_number}
        width="50"
        height="70"
      />
    ))}
  </div>
  )
}

const renderRightSide = () => {(
    <div>
    {right.map(({player_number}) => (
      <img
        key={player_number}
        src="/assets/playingcards/card_background.png"
        alt={player_number}
        width="50"
        height="70"
      />
    ))}
  </div>
  )
} */

export const tableUtils = {
  renderTokens,
/*   splitPlayersToLeftAndRightSide,
  renderLeftSide,
  renderRightSide */
}
