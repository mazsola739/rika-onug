import {
  AlienIcon,
  ArtifactIcon,
  AssassinIcon,
  AwesomeIcon,
  BabyAlienIcon,
  BatIcon,
  BlindIcon,
  BlobIcon,
  BulbIcon,
  ClarityIcon,
  ClawIcon,
  ClosedIcon,
  ClosingIcon,
  ConnectingIcon,
  CopyIcon,
  CowIcon,
  CupidIcon,
  DiseasedIcon,
  DreamwolfIcon,
  DressIcon,
  DrunkIcon,
  EmpathIcon,
  EvilIcon,
  EyeIcon,
  FamilyIcon,
  FangIcon,
  FearIcon,
  FriendIcon,
  IdIcon,
  InsomniacIcon,
  InteractionIcon,
  InvestigatorIcon,
  JestIcon,
  LikeIcon,
  LoverIcon,
  MadIcon,
  MasonIcon,
  MorticianIcon,
  MuteIcon,
  NewalienIcon,
  NiceIcon,
  NightIcon,
  OpenIcon,
  OracleIcon,
  PrettyIcon,
  RobberIcon,
  SecretIcon,
  SeerIcon,
  SelectIcon,
  SentinelIcon,
  ShieldIcon,
  SmellIcon,
  SpyIcon,
  SusIcon,
  SwapIcon,
  TannerIcon,
  TapIcon,
  TargetIcon,
  TraitorIcon,
  TrophyIcon,
  UfoIcon,
  UninstantiatedIcon,
  VampireIcon,
  VillainIcon,
  VoodooIcon,
  WerewolfIcon,
  WitchIcon,
} from 'assets'
import { StyledIcon } from './Icon.styles'
import { IconType, IconProps } from './Icon.types'

export const Icons: Record<
  IconType,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  alien: AlienIcon,
  artifact: ArtifactIcon,
  assassin: AssassinIcon,
  awesome: AwesomeIcon,
  babyalien: BabyAlienIcon,
  bat: BatIcon,
  blind: BlindIcon,
  blob: BlobIcon,
  bulb: BulbIcon,
  clarity: ClarityIcon,
  claw: ClawIcon,
  closed: ClosedIcon,
  closing: ClosingIcon,
  connecting: ConnectingIcon,
  copy: CopyIcon,
  cow: CowIcon,
  cupid: CupidIcon,
  diseased: DiseasedIcon,
  dreamwolf: DreamwolfIcon,
  dress: DressIcon,
  drunk: DrunkIcon,
  empath: EmpathIcon,
  evil: EvilIcon,
  eye: EyeIcon,
  family: FamilyIcon,
  fang: FangIcon,
  fear: FearIcon,
  friend: FriendIcon,
  id: IdIcon,
  insomniac: InsomniacIcon,
  interaction: InteractionIcon,
  investigator: InvestigatorIcon,
  jest: JestIcon,
  like: LikeIcon,
  lover: LoverIcon,
  mad: MadIcon,
  mason: MasonIcon,
  mortician: MorticianIcon,
  mute: MuteIcon,
  newalien: NewalienIcon,
  nice: NiceIcon,
  night: NightIcon,
  open: OpenIcon,
  oracle: OracleIcon,
  pretty: PrettyIcon,
  robber: RobberIcon,
  secret: SecretIcon,
  seer: SeerIcon,
  select: SelectIcon,
  sentinel: SentinelIcon,
  shield: ShieldIcon,
  smell: SmellIcon,
  spy: SpyIcon,
  sus: SusIcon,
  swap: SwapIcon,
  tanner: TannerIcon,
  tap: TapIcon,
  target: TargetIcon,
  traitor: TraitorIcon,
  trophy: TrophyIcon,
  ufo: UfoIcon,
  uninstantiated: UninstantiatedIcon,
  vampire: VampireIcon,
  villain: VillainIcon,
  voodoo: VoodooIcon,
  werewolf: WerewolfIcon,
  witch: WitchIcon,
}

export const Icon: React.FC<IconProps> = ({ iconName, size }) => {
  return <StyledIcon as={Icons[iconName]} size={size} />
}
