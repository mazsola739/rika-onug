import { observer } from 'mobx-react-lite'
import { OwnCardContainer, OwnCardText } from './OwnCard.styles'
import { OwnCardProps } from './OwnCard.types'
import { utils } from 'utils'
import { CardImage } from 'components'
import { deckStore } from 'store'

const { capitalize } = utils

export const OwnCard: React.FC<OwnCardProps> = observer(({ player }) => {
  const card = deckStore.getCardById(player.player_card_id)
  //TODO Add mark

  return (
    <OwnCardContainer>
      <OwnCardText>
        Player {player.player_number}: <br />
        {player.player_name}
      </OwnCardText>
      <CardImage image={card.card_name} size={100}></CardImage>
      <OwnCardText>Team: {capitalize(player.player_team)}</OwnCardText>
      <OwnCardText>Role: {capitalize(player.player_role)}</OwnCardText>
    </OwnCardContainer>
  )
})
