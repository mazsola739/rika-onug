import { ClosedIcon, ClosingIcon, ConnectingIcon, OpenIcon, UninstantiatedIcon } from 'assets'
import { StyledIcon } from './Icon.styles'
import { IconProps, IconType } from './Icon.types'

export const Icons: Record<IconType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  closed: ClosedIcon,
  closing: ClosingIcon,
  connecting: ConnectingIcon,
  open: OpenIcon,
  uninstantiated: UninstantiatedIcon
}

export const Icon: React.FC<IconProps> = ({ iconName, size }) => <StyledIcon as={Icons[iconName]} size={size} />
