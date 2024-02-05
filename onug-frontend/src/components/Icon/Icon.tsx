import {
  AlienIcon,
  ArtifactIcon,
  AssassinIcon,
  BlobIcon,
  ClosedIcon,
  ClosingIcon,
  ConnectingIcon,
  CowIcon,
  DreamwolfIcon,
  FamilyIcon,
  FangIcon,
  InteractionIcon,
  LoverIcon,
  MasonIcon,
  MorticianIcon,
  OpenIcon,
  SecretIcon,
  SeerIcon,
  SelectIcon,
  ShieldIcon,
  SpinnerIcon,
  SupervillainIcon,
  TannerIcon,
  UninstantiatedIcon,
  VampireIcon,
  WerewolfIcon,
} from 'assets'
import { StyledIcon } from './Icon.styles'
import { IconProps } from './Icon.types'
import { IconType } from 'types'

export const Icons: Record<
  IconType,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  alien: AlienIcon,
  artifact: ArtifactIcon,
  assassin: AssassinIcon,
  blob: BlobIcon,
  closed: ClosedIcon,
  closing: ClosingIcon,
  connecting: ConnectingIcon,
  cow: CowIcon,
  dreamwolf: DreamwolfIcon,
  family: FamilyIcon,
  fang: FangIcon,
  interaction: InteractionIcon,
  lover: LoverIcon,
  mason: MasonIcon,
  mortician: MorticianIcon,
  open: OpenIcon,
  secret: SecretIcon,
  seer: SeerIcon,
  select: SelectIcon,
  shield: ShieldIcon,
  spinner: SpinnerIcon,
  supervillain: SupervillainIcon,
  tanner: TannerIcon,
  uninstantiated: UninstantiatedIcon,
  vampire: VampireIcon,
  werewolf: WerewolfIcon,
}

export const Icon: React.FC<IconProps> = ({ iconName, size }) => {
  return <StyledIcon as={Icons[iconName]} size={size} />
}
