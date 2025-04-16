import { EXPANSIONS } from 'constant'
import { observer } from 'mobx-react-lite'
import { StyledFilter, FilterButtons } from './Filter.styles'
import { FilterButton } from './FilterButton'
import { Expansion } from 'types'
import { Title } from 'components'

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
