import { Token } from 'components'
import { Marks } from './GameTable.styles'
import { TokenType } from 'types'

const renderMarks = (selectedMarks: TokenType[]) => (
  <Marks>
    {selectedMarks.map(
      (mark, index) =>
        mark.is_in_deck && (
          <Token key={index} tokenName={mark.token_name} size={55} />
        )
    )}
  </Marks>
)

const renderArtifacts = (
  artifacts: TokenType[],
  hasCurator: boolean,
  hasSentinel: boolean
) => (
  <Marks>
    {hasSentinel && <Token tokenName="shield" size={55} />}
    {hasCurator &&
      artifacts.map(
        (artifact, index) =>
          artifact.token_name !== 'shield' && (
            <Token key={index} tokenName={artifact.token_name} size={55} />
          )
      )}
  </Marks>
)

export const gameTableUtils = {
  renderMarks,
  renderArtifacts,
}
