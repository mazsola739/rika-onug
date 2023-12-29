import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import { deckStore } from 'store'
import { StyledFilter } from './Filter.styles'
import { expansions } from 'constant'
import { FilterButtons } from './FilterButtons'

export const Filter = observer(() => {
  const { selectedExpansions, toggleExpansionSelection } = deckStore
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
