import { Token } from 'components'
import { artifacts } from 'data'
import { observer } from 'mobx-react-lite'
import { deckStore } from 'store'
import { GroupTitle, StyledCenterTokens, TokenGroup, Tokens } from './CenterTokens.styles'

export const CenterTokens: React.FC = observer(() => {
  const { selectedMarks, hasSentinel, hasMarks, hasCurator } = deckStore

  const renderToken = (title: string) => {
    return (
      <TokenGroup>
        <GroupTitle>{title}</GroupTitle>
        <Tokens>
          <Token tokenName="shield" size={40} />
        </Tokens>
      </TokenGroup>
    )
  }

  return (
    <StyledCenterTokens>
      {hasSentinel && renderToken('Shield')}
      {hasMarks && (
        <TokenGroup>
          <GroupTitle>Marks</GroupTitle>
          <Tokens>
            {selectedMarks.map((selectedMark, index) => (
              <Token key={index} tokenName={selectedMark.token_name} size={40} />
            ))}
          </Tokens>
        </TokenGroup>
      )}
      {hasCurator && (
        <TokenGroup>
          <GroupTitle>Artifacts</GroupTitle>
          <Tokens>{artifacts.map((artifact, index) => artifact.token_name !== 'shield' && <Token key={index} tokenName={'artifact_back'} size={40} />)}</Tokens>
        </TokenGroup>
      )}
    </StyledCenterTokens>
  )
})
