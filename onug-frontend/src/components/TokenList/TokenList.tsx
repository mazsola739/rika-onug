import { observer } from 'mobx-react-lite'
import { deckStore } from 'store'
import {
  StyledTokenList,
  TokenListTitle,
  TokenListGrid,
  TokenImage,
} from './TokenList.styles'

export const TokenList = observer(() => {
  const { artifacts, marks } = deckStore

  const handleTokenClick = (tokenId: number) => {
    deckStore.toggleInfo(tokenId, 'token')
  }

  return (
    <StyledTokenList>
      {artifacts.length > 0 && <TokenListTitle>Artifacts</TokenListTitle>}
      <TokenListGrid>
        {artifacts.map((artifact) => (
          <TokenImage
            key={artifact.id}
            src={require(`../../assets/tokens/${artifact.card_name}.png`)}
            alt={artifact.card_name}
            onClick={() => handleTokenClick(artifact.id)}
          />
        ))}
      </TokenListGrid>
      {marks.length > 0 && <TokenListTitle>Marks</TokenListTitle>}
      <TokenListGrid>
        {marks.map((mark) => (
          <TokenImage
            key={mark.id}
            src={require(`../../assets/tokens/${mark.card_name}.png`)}
            alt={mark.card_name}
            onClick={() => handleTokenClick(mark.id)}
          />
        ))}
      </TokenListGrid>
    </StyledTokenList>
  )
})
