import { useState, useCallback, useEffect } from 'react'
import { roomStore } from 'store'
import { StyledFilterButton } from './Filter.styles'
import { FilterButtonProps } from './Filter.types'
import { observer } from 'mobx-react-lite'
import { autorun } from 'mobx'

export const FilterButton: React.FC<FilterButtonProps> = observer(
  ({ expansion, onClick, isSelected: propIsSelected }) => {
    const [isSelected, setIsSelected] = useState(propIsSelected)
    const shortName = roomStore.getExpansionShortName(expansion)

    const handleClick = useCallback(() => {
      setIsSelected((prev) => !prev)
      onClick(expansion)
    }, [expansion, onClick])

    useEffect(
      () => autorun(() => setIsSelected(propIsSelected)),
      [propIsSelected]
    )

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
)
