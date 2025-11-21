import { MenuButton } from 'components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { deckStore } from 'store'
import { FilterButtonProps } from './Filter.types'
import { useClickHandler } from 'hooks/useClickHandler'

export const FilterButton: React.ComponentType<FilterButtonProps> = observer(({ expansion }) => {
  const { handleFilter } = useClickHandler()
  const isSelected = deckStore.selectedExpansions.includes(expansion)

  const bgImg = `/assets/backgrounds/expansion_${expansion.toLocaleLowerCase().replace(' ', '')}.webp`

  return <MenuButton bgImg={bgImg} isSelected={isSelected} onClick={() => handleFilter(expansion)} />
})
