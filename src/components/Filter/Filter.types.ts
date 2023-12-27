export interface FilterButtonProps {
  expansion: string
  onClick: (expansion: string) => void
  isSelected: boolean
}

export interface FilterButtonsProps {
  expansionNames: string[]
  selectedExpansions: string[]
  onToggleExpansion: (expansion: string) => void
}
