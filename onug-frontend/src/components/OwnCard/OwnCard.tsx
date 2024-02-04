import { observer } from 'mobx-react-lite'
import { OwnCardContainer, OwnCardText } from './OwnCard.styles'
import { OwnCardProps } from './OwnCard.types'
import { utils } from 'utils'
import { CardImage } from 'components'

const { capitalize } = utils

export const OwnCard: React.FC<OwnCardProps> = observer(({ player }) => (
  <OwnCardContainer>
    <OwnCardText>
      Player {player.player_number}:<br />
      {player.player_name}
    </OwnCardText>
    <CardImage image={player.player_card.card_name} size={100}></CardImage>
    <OwnCardText>Team: {capitalize(player.player_card.team)}</OwnCardText>
    <OwnCardText>
      Role: {capitalize(player.player_card.display_name)}
    </OwnCardText>
  </OwnCardContainer>
))
