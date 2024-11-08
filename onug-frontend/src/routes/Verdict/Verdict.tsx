import { Main, ResultTable } from 'components'
import { observer } from 'mobx-react-lite'
import { StyledVerdict } from './Verdict.styles'
import { VerdictFooter } from './VerdictFooter'
import { VerdictHeader } from './VerdictHeader'
import { VerdictInfoPanel } from './VerdictInfoPanel'

export const Verdict: React.FC = observer(() => {

  return (
    <StyledVerdict>
      <VerdictHeader />

      <Main>
      <ResultTable />
      </Main>

      <VerdictFooter />
      <VerdictInfoPanel />
    </StyledVerdict>
  )
})
