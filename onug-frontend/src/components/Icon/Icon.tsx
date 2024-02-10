import {
  AlienIcon,
  ArtifactIcon,
  AssassinIcon,
  BlindIcon,
  BlobIcon,
  ClawIcon,
  ClosedIcon,
  ClosingIcon,
  ConnectingIcon,
  CowIcon,
  DreamwolfIcon,
  EyeIcon,
  FamilyIcon,
  FangIcon,
  InteractionIcon,
  LoverIcon,
  MasonIcon,
  MorticianIcon,
  MuteIcon,
  OpenIcon,
  SecretIcon,
  SeerIcon,
  SelectIcon,
  ShieldIcon,
  SpinnerIcon,
  SupervillainIcon,
  TannerIcon,
  UfoIcon,
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
  blind: BlindIcon,
  blob: BlobIcon,
  claw: ClawIcon,
  closed: ClosedIcon,
  closing: ClosingIcon,
  connecting: ConnectingIcon,
  cow: CowIcon,
  dreamwolf: DreamwolfIcon,
  eye: EyeIcon,
  family: FamilyIcon,
  fang: FangIcon,
  interaction: InteractionIcon,
  lover: LoverIcon,
  mason: MasonIcon,
  mortician: MorticianIcon,
  mute: MuteIcon,
  open: OpenIcon,
  secret: SecretIcon,
  seer: SeerIcon,
  select: SelectIcon,
  shield: ShieldIcon,
  spinner: SpinnerIcon,
  supervillain: SupervillainIcon,
  tanner: TannerIcon,
  ufo: UfoIcon,
  uninstantiated: UninstantiatedIcon,
  vampire: VampireIcon,
  werewolf: WerewolfIcon,
}

export const Icon: React.FC<IconProps> = ({ iconName, size }) => {
  return <StyledIcon as={Icons[iconName]} size={size} />
}
