import { RoleImage } from 'components'
import { observer } from 'mobx-react-lite'
import { deckStore } from 'store'
import { capitalize } from 'utils'
import { OwnCardContainer, OwnCardText } from './OwnCard.styles'
import { OwnCardProps } from './OwnCard.types'
import { ROLES } from 'constant'

export const OwnCard: React.FC<OwnCardProps> = observer(({ player }) => {
  const card = deckStore.getCardById(player.player_card_id)

  const roleName = ROLES[`role_${player.player_role.toLowerCase().replace('_', '')}` as keyof typeof ROLES]
  //TODO Add mark role id

  return (
    <OwnCardContainer>
      <OwnCardText>
        Player {player.player_number}: <br />
        {player.player_name}
      </OwnCardText>
      <RoleImage image={card.card_name} size={80}></RoleImage>
      <OwnCardText>Team: {capitalize(player.player_team)}</OwnCardText>
      <OwnCardText>Role: {roleName}</OwnCardText>
    </OwnCardContainer>
  )
})
