import { observer } from 'mobx-react-lite'
import { roomStore } from 'store'
import { Avatar, Character, Rule, StyledRuleInfo } from './RuleInfo.styles'

export const RuleInfo: React.ComponentType = observer(() => {
  const detailedCardInfo = roomStore.getDetailedCardInfo()

  const imgSrc = detailedCardInfo.id !== 0 ? `/assets/cards/${detailedCardInfo.card_name}.webp` : ''

  return (
    <StyledRuleInfo>
      {imgSrc && <Avatar src={imgSrc} alt='info' />}
      <Character>{detailedCardInfo.display_name.toLocaleUpperCase()}</Character>
      <Rule>{detailedCardInfo.rules}</Rule>
    </StyledRuleInfo>
  )
})
