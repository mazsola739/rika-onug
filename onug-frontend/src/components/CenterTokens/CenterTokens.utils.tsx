import { Token } from 'components/Token/Token'
import { artifacts } from 'data'
import { deckStore } from 'store'
import { CenterTokenContainer, Tokens, TokenGroup, GroupTitle } from './CenterTokens.styles'

export const renderTokens = () => {
  const { selectedMarks, hasSentinel, hasMarks, hasCurator } = deckStore

  const renderToken = (title: string) => {
    return (
      <TokenGroup>
        <GroupTitle>{title}</GroupTitle>
        <Tokens>
          <Token tokenName="shield" size={55} />
        </Tokens>
      </TokenGroup>
    )
  }

  return (
    <CenterTokenContainer>
      {hasSentinel && renderToken('Shield')}
      {hasMarks && (
        <TokenGroup>
          <GroupTitle>Marks</GroupTitle>
          <Tokens>
            {selectedMarks.map((selectedMark, index) => (
              <Token
                key={index}
                tokenName={selectedMark.token_name}
                size={55}
              />
            ))}
          </Tokens>
        </TokenGroup>
      )}
      {hasCurator && (
        <TokenGroup>
          <GroupTitle>Artifacts</GroupTitle>
          <Tokens>
            {artifacts.map(
              (artifact, index) => artifact.token_name !== 'shield' && (
                <Token key={index} tokenName={artifact.token_name} size={55} />
              )
            )}
          </Tokens>
        </TokenGroup>
      )}
    </CenterTokenContainer>
  )
}
