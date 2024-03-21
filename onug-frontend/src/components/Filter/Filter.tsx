import { EXPANSIONS } from 'constant'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import { roomStore } from 'store'
import { StyledFilter } from './Filter.styles'
import { FilterButtons } from './FilterButtons'

//TODO from backend - now its not working properly
export const Filter: React.FC = observer(() => {
  const { selectedExpansions, toggleExpansionSelection } = roomStore

  const expansionNames = Object.values(EXPANSIONS)

  const handleToggleExpansion = useCallback(
    (expansion: string) => toggleExpansionSelection(expansion),
    [toggleExpansionSelection]
  )

  return (
    <StyledFilter>
      <FilterButtons
        expansionNames={expansionNames}
        selectedExpansions={selectedExpansions}
        onToggleExpansion={handleToggleExpansion}
      />
    </StyledFilter>
  )
})
