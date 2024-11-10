import { Main, ResultTable } from 'components'
import { observer } from 'mobx-react-lite'
import { StyledVerdict, VerdictCenter } from './Verdict.styles'
import { VerdictFooter } from './VerdictFooter'
import { VerdictHeader } from './VerdictHeader'
import { VerdictInfoPanel } from './VerdictInfoPanel'
import { useVerdict } from './useVerdict'

export const Verdict: React.FC = observer(() => {
  useVerdict()

  return (
    <StyledVerdict>
      <VerdictHeader />
      <Main>
        <VerdictCenter>
          <ResultTable />
        </VerdictCenter>
      </Main>
      <VerdictFooter />
      <VerdictInfoPanel />
    </StyledVerdict>
  )
})
