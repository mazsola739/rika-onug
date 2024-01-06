import { observer } from 'mobx-react-lite'
import { roomStore } from 'store'
import {
  StyledTokenList,
  TokenListTitle,
  TokenListGrid,
} from './TokenList.styles'
import { TokenImage } from 'components'

export const TokenList = observer(() => {
  const { artifacts, marks } = roomStore

  const handleTokenClick = (
    tokenId: number,
    tokenType: 'artifact' | 'mark'
  ) => {
    roomStore.toggleInfo(tokenId, tokenType)
  }

  return (
    <StyledTokenList>
      {artifacts.length > 0 && <TokenListTitle>Artifacts</TokenListTitle>}
      <TokenListGrid>
        {artifacts.map((artifact) => (
          <TokenImage
            key={artifact.id}
            tokenName={artifact.token_name}
            onClick={() => handleTokenClick(artifact.id, 'artifact')}
          />
        ))}
      </TokenListGrid>
      {marks.length > 0 && <TokenListTitle>Marks</TokenListTitle>}
      <TokenListGrid>
        {marks.map((mark) => (
          <TokenImage
            key={mark.id}
            tokenName={mark.token_name}
            onClick={() => handleTokenClick(mark.id, 'mark')}
          />
        ))}
      </TokenListGrid>
    </StyledTokenList>
  )
})
