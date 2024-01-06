import { logo_en_1 } from 'assets'
import { Header, Filter } from 'components'
import { observer } from 'mobx-react-lite'
import { RuleInfoDescription, StyledLogo, StyledRuleInfo } from './Room.styles'
import { gamePlayStore, roomStore } from 'store'

const RuleInfo = observer(() => {
  const { isGameStopped } = gamePlayStore
  const detailedCardInfo = roomStore.getDetailedCardInfo()
  const detailedTokenInfo = roomStore.getDetailedTokenInfo()

  const displayInfo =
    detailedCardInfo.id !== 0 ? detailedCardInfo.rules : detailedTokenInfo.rules

  return (
    <StyledRuleInfo>
      {isGameStopped && displayInfo && (
        <RuleInfoDescription>{displayInfo}</RuleInfoDescription>
      )}
    </StyledRuleInfo>
  )
})

export const RoomHeader = observer(() => {
  return (
    <Header>
      <StyledLogo src={logo_en_1} alt="header" />
      <Filter />
      <RuleInfo />
    </Header>
  )
})
