import { EXPANSIONS } from 'constant'
import { observer } from 'mobx-react-lite'
import { StyledFilter, FilterButtons } from './Filter.styles'
import { FilterButton } from './FilterButton'
import { ExpansionType } from 'types'
import { Title } from 'components'

export const Filter: React.FC = observer(() => {
  const expansionNames = Object.values(EXPANSIONS)

  return (
    <StyledFilter>
      <Title title={'EXPANSIONS'} />
      <FilterButtons>
        {expansionNames.map((expansion, index) => (
          <FilterButton key={index} expansion={expansion as ExpansionType} isSelected={false} />
        ))}
      </FilterButtons>
    </StyledFilter>
  )
})
