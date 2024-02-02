import { Token } from 'components'
import { Marks } from './GameTable.styles'
import { MarkType, TokenType } from 'types'

const renderMarks = (selectedMarks: MarkType[]) => (
  <Marks>
    {selectedMarks.map(
      (mark, index) =>
        mark.is_in_deck && (
          <Token key={index} tokenName={mark.token_name} size={60} />
        )
    )}
  </Marks>
)

const renderArtifacts = (artifacts: TokenType[]) => (
  <Marks>
    {artifacts.map(
      (artifact, index) =>
        artifact.token_name !== 'shield' && (
          <Token key={index} tokenName={artifact.token_name} size={60} />
        )
    )}
  </Marks>
)

export const gameTableUtils = {
  renderMarks,
  renderArtifacts,
}
