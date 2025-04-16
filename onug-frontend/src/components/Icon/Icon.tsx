import { ClosedIcon, ClosingIcon, ConnectingIcon, OpenIcon, UninstantiatedIcon } from 'assets'
import { StyledIcon } from './Icon.styles'
import { IconProps, IconType } from './Icon.types'

const Icons: Record<IconType, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  closed: ClosedIcon,
  closing: ClosingIcon,
  connecting: ConnectingIcon,
  open: OpenIcon,
  uninstantiated: UninstantiatedIcon
}

export const Icon: React.ComponentType<IconProps> = ({ iconName, size }) => {
  const IconComponent = Icons[iconName]

  return <StyledIcon as={IconComponent} size={size} />
}
