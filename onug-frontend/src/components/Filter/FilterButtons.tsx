import { observer } from 'mobx-react-lite'
import { StyledFilterButtons } from './Filter.styles'
import { FilterButtonsProps } from './Filter.types'
import { FilterButton } from './FilterButton'

export const FilterButtons: React.FC<FilterButtonsProps> = observer(
  ({ expansionNames, selectedExpansions, onToggleExpansion }) => (
    <StyledFilterButtons>
      {expansionNames.map((expansion, index) => (
        <FilterButton
          key={index}
          expansion={expansion}
          onClick={() => onToggleExpansion(expansion)}
          isSelected={selectedExpansions.includes(expansion)}
        />
      ))}
    </StyledFilterButtons>
  )
)
