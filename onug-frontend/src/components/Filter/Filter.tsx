import { observer } from 'mobx-react-lite'
import { useState, useCallback, useEffect } from 'react'
import { deckStore } from 'store'
import {
  StyledFilterButtons,
  StyledFilterButton,
  StyledFilter,
} from './Filter.styles'
import { FilterButtonsProps, FilterButtonProps } from './Filter.types'
import { expansions } from 'constant'

const FilterButton: React.FC<FilterButtonProps> = ({
  expansion,
  onClick,
  isSelected: propIsSelected,
}) => {
  const [isSelected, setIsSelected] = useState(propIsSelected)
  const shortName = deckStore.getExpansionShortName(expansion)

  const handleClick = useCallback(() => {
    setIsSelected((prev) => !prev)
    onClick(expansion)
  }, [expansion, onClick])

  useEffect(() => setIsSelected(propIsSelected), [propIsSelected])

  return (
    <StyledFilterButton
      onClick={handleClick}
      isSelected={isSelected}
      expansion={shortName}
    >
      {expansion}
    </StyledFilterButton>
  )
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  expansionNames,
  selectedExpansions,
  onToggleExpansion,
}) => (
  <StyledFilterButtons>
    {expansionNames.map((expansion) => (
      <FilterButton
        key={expansion}
        expansion={expansion}
        onClick={() => onToggleExpansion(expansion)}
        isSelected={selectedExpansions.includes(expansion)}
      />
    ))}
  </StyledFilterButtons>
)

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
