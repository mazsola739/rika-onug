export interface DropdownMenuProps {
  label: string
  name: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  required: boolean
  defaultValue: string
  options: string[]
}
