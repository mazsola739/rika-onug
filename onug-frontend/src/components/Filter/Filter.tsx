import { EXPANSIONS } from 'constant'
import { observer } from 'mobx-react-lite'
import { StyledFilter, StyledFilterButtons } from './Filter.styles'
import { FilterButton } from './FilterButton'

//TODO from backend - now its not working properly
export const Filter: React.FC = observer(() =>  {

  const expansionNames = Object.values(EXPANSIONS)
  
  return (
    <StyledFilter>
      <StyledFilterButtons>
        {expansionNames.map((expansion, index) => (
          <FilterButton key={index} expansion={expansion} isSelected={false} />
        ))}
      </StyledFilterButtons>
    </StyledFilter>
  )}
)
