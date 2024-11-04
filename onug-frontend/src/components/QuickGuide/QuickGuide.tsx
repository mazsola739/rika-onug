import { observer } from 'mobx-react-lite'
import { deckStore } from 'store'
import { CardJson, TokenJson } from 'types'
import { Guide, Item, QuickGuideRule, StyledQuickGuide } from './QuickGuide.styles'
import { getUniqueGuide, isCardType } from './QuickGuide.utils'
import { QuickGuideToken } from './QuickGuideToken'

//TODO better quick guide text!!!!
export const QuickGuide: React.FC = observer(() => {
  const { selectedCards, selectedMarks, artifacts } = deckStore

  const uniqueSelectedCards = getUniqueGuide(
    selectedCards,
    (card) => card.display_name
  )
  const uniqueSelectedMarks = getUniqueGuide(
    selectedMarks,
    (mark) => mark.token_name
  )

  const renderGuide = (item: CardJson | TokenJson) => {
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
      {uniqueSelectedCards.map((card) => renderGuide(card))}
      {uniqueSelectedMarks.map((mark) => renderGuide(mark))}
      {artifacts.map((artifact) => renderGuide(artifact))}
    </Guide>
  )
})
