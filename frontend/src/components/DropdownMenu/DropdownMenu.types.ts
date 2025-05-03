import { LobbyDataType } from 'types'

export interface DropdownMenuProps {
  label: string
  name: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  required: boolean
  defaultValue: string
  placeholder: string
  options: LobbyDataType[]
}
