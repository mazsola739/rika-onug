import { observer } from 'mobx-react-lite'
import { Option, Select, StyledDropdownMenu } from './DropdownMenu.styles'
import { DropdownMenuProps } from './DropdownMenu.types'
import { Label } from 'routes/God/God.styles'

export const DropdownMenu: React.ComponentType<DropdownMenuProps> = observer(({ label, name, onChange, required, defaultValue = '', placeholder, options }) => (
  <StyledDropdownMenu>
    <Label>{label}</Label>
    <Select name={name} onChange={onChange} required={required} defaultValue={defaultValue}>
      <Option value={defaultValue} disabled>
        {placeholder}
      </Option>
      {options.map(({ value, option }, index) => (
        <Option key={index} value={value}>
          {option}
        </Option>
      ))}
    </Select>
  </StyledDropdownMenu>
))
