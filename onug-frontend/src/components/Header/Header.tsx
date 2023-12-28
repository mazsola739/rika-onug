import { logo_en_1 } from 'assets'
import { Filter } from 'components'
import {
  StyledRuleInfo,
  RuleInfoDescription,
  StyledLogo,
  StyledHeader,
} from './Header.styles'
import { observer } from 'mobx-react-lite'
import { gamePlayStore, deckStore } from 'store'

const Logo = () => <StyledLogo src={logo_en_1} alt="header" />

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

export const Header = () => {
  return (
    <StyledHeader>
      <Logo />
      <Filter />
      <RuleInfo />
    </StyledHeader>
  )
}
