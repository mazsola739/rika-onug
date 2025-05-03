import { ResultTable } from 'components'
import { Main } from 'layouts'
import { observer } from 'mobx-react-lite'
import { useVerdict } from './useVerdict'
import { StyledVerdict, VerdictCenter } from './Verdict.styles'
import { VerdictFooter } from './VerdictFooter'
import { VerdictHeader } from './VerdictHeader'
import { VerdictInfoPanel } from './VerdictInfoPanel'

export const Verdict: React.ComponentType = observer(() => {
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
