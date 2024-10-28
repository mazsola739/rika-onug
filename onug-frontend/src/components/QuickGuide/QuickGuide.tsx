
import { observer } from 'mobx-react-lite'
import { deckStore } from 'store'
import { Guide, Item, QuickGuideRule, StyledQuickGuide } from './QuickGuide.styles'
import { QuickGuideToken } from './QuickGuideToken'

//TODO quick guide text
export const QuickGuide: React.FC = observer(() => {
  const { selectedCards, selectedMarks, artifacts } = deckStore

  return (
    <Guide>
      <StyledQuickGuide>QUICK GUIDE</StyledQuickGuide>
      {selectedCards.map((card, index) => (
        <Item key={index} expansion={card.expansion}>
          <QuickGuideToken image={card.card_name} expansion={card.expansion} />
          <QuickGuideRule>{card.rules}</QuickGuideRule>
        </Item>
      ))}
      {selectedMarks.map((mark, index) => (
        <Item key={index} expansion={mark.expansion}>
          <QuickGuideToken image={mark.token_name} />
          <QuickGuideRule>{mark.rules}</QuickGuideRule>
          </Item>
        ))}
      {artifacts.map((artifact, index) => (
        <Item key={index} expansion={artifact.expansion}>
          <QuickGuideToken image={artifact.token_name} />
          <QuickGuideRule>{artifact.rules}</QuickGuideRule>
        </Item>
      ))}
    </Guide>
  )
})
