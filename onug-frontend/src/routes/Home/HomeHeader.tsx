import { logo_en_1 } from 'assets'
import { Header, Filter } from 'components'
import { observer } from 'mobx-react-lite'
import { StyledLogo, StyledRuleInfo } from './Home.styles'

export const HomeHeader = observer(() => {
  return (
    <Header>
      <StyledLogo src={logo_en_1} alt="header" />
      <Filter />
      <StyledRuleInfo />
    </Header>
  )
})
