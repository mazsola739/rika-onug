import { EXPANSIONS } from 'constants'
import { observer } from 'mobx-react-lite'
import { Expansion } from 'types'
import { Title } from 'typography'
import { StyledFilter, FilterButtons } from './Filter.styles'
import { FilterButton } from './FilterButton'

export const Filter: React.ComponentType = observer(() => {
  const expansionNames = Object.values(EXPANSIONS)

  return (
    <StyledFilter>
      <Title title={'EXPANSIONS'} />
      <FilterButtons>
        {expansionNames.map((expansion, index) => (
          <FilterButton key={index} expansion={expansion as Expansion} isSelected={false} />
        ))}
      </FilterButtons>
    </StyledFilter>
  )
})
