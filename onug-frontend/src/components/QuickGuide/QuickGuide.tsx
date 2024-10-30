import { observer } from 'mobx-react-lite'
import { deckStore } from 'store'
import { Guide, Item, QuickGuideRule, StyledQuickGuide } from './QuickGuide.styles'
import { QuickGuideToken } from './QuickGuideToken'
import { CardJson, TokenJson } from 'types'
import { getUniqueItems, isCardType } from './QuickGuide.utils'

//TODO quick guide text
export const QuickGuide: React.FC = observer(() => {
  const { selectedCards, selectedMarks, artifacts } = deckStore

  const uniqueSelectedCards = getUniqueItems(
    selectedCards,
    (card) => card.display_name
  )
  const uniqueSelectedMarks = getUniqueItems(
    selectedMarks,
    (mark) => mark.token_name
  )

  const renderItem = (item: CardJson | TokenJson) => {
    if (isCardType(item)) {
      return (
        <Item key={item.display_name} expansion={item.expansion}>
          <QuickGuideToken image={item.card_name} expansion={item.expansion} />
          <QuickGuideRule>{item.rules}</QuickGuideRule>
        </Item>
      )
    } else {
      return (
        <Item key={item.token_name} expansion={item.expansion}>
          <QuickGuideToken image={item.token_name} />
          <QuickGuideRule>{item.rules}</QuickGuideRule>
        </Item>
      )
    }
  }

  return (
    <Guide>
      <StyledQuickGuide>QUICK GUIDE</StyledQuickGuide>
      {uniqueSelectedCards.map((card) => renderItem(card))}
      {uniqueSelectedMarks.map((mark) => renderItem(mark))}
      {artifacts.map((artifact) => renderItem(artifact))}
    </Guide>
  )
})
