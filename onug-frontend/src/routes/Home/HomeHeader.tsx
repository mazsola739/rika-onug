import { logo_en_1 } from 'assets'
import { Header, Filter } from 'components'
import { observer } from 'mobx-react-lite'
import { RuleInfoDescription, StyledLogo, StyledRuleInfo } from './Home.styles'
import { gamePlayStore, deckStore } from 'store'

const RuleInfo = observer(() => {
  const { isGameStopped } = gamePlayStore
  const detailedCardInfo = deckStore.getDetailedCardInfo()
  const detailedTokenInfo = deckStore.getDetailedTokenInfo()

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

export const HomeHeader = observer(() => {
  return (
    <Header>
      <StyledLogo src={logo_en_1} alt="header" />
      <Filter />
      <RuleInfo />
    </Header>
  )
})
