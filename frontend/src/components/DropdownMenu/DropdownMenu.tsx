import { observer } from 'mobx-react-lite'
import { Option, Select, StyledDropdownMenu } from './DropdownMenu.styles'
import { DropdownMenuProps } from './DropdownMenu.types'
import { Label } from 'routes/God/God.styles'

export const DropdownMenu: React.ComponentType<DropdownMenuProps> = observer(({ label, name, onChange, required, defaultValue = '', options }) => (
  <StyledDropdownMenu>
    <Label>{label}</Label>
    <Select name={name} onChange={onChange} required={required} defaultValue={defaultValue}>
      <Option value={defaultValue} disabled>
        Select an options
      </Option>
      {options.map((option, index) => (
        <Option key={index} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  </StyledDropdownMenu>
))
