import { DealtToken } from 'components'
import { TokenType } from 'types'
import { Marks } from './Dealing.styles'

const renderMarks = (selectedMarks: TokenType[]) => (
  <Marks>
    {selectedMarks.map((mark, index) => (
      <DealtToken key={index} tokenName={mark.token_name} size={55} />
    ))}
  </Marks>
)

const renderArtifacts = (
  artifacts: TokenType[],
  hasCurator: boolean,
  hasSentinel: boolean
) => (
  <Marks>
    {hasSentinel && <DealtToken tokenName="shield" size={55} />}
    {hasCurator &&
      artifacts.map(
        (artifact, index) =>
          artifact.token_name !== 'shield' && (
            <DealtToken key={index} tokenName={artifact.token_name} size={55} />
          )
      )}
  </Marks>
)

export const dealingUtils = {
  renderMarks,
  renderArtifacts,
}
