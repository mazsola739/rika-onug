import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import { roomStore } from 'store'
import { expansions } from 'constant'
import { FilterButtons } from './FilterButtons'
import { StyledFilter } from './Filter.styles'

//TODO from backend - now its not working properly
export const Filter: React.FC = observer(() => {
  const { selectedExpansions, toggleExpansionSelection } = roomStore

  const expansionNames = Object.values(expansions)

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
