import { observer } from 'mobx-react-lite'
import { KnownOwnCardContainer, KnownOwnCardText } from './KnownOwnCard.styles'
import { KnownOwnCardProps } from './KnownOwnCard.types'
import { utils } from 'utils'
import { CardImage, Icon } from 'components'
import { deckStore } from 'store'

const { capitalize } = utils

export const KnownOwnCard: React.FC<KnownOwnCardProps> = observer(
  ({ player }) => {
    const card = player?.player_card_id
      ? deckStore.getCardById(player.player_card_id)
      : null

    const playerNumber = player?.player_number || ''
    const playerName = player?.player_name || ''
    const playerTeam = player?.player_team || ''
    const playerRole = player?.player_role || ''
    const original =
      deckStore.getCardById(player?.player_original_id)?.display_name || ''

    return (
      <KnownOwnCardContainer>
        <KnownOwnCardText>
          Player {playerNumber}:<br />
          {playerName}
        </KnownOwnCardText>
        <KnownOwnCardText>{capitalize(original)}</KnownOwnCardText>
        {player?.player_card_id > 0 ? (
          <CardImage image={card?.card_name} size={100}></CardImage>
        ) : (
          <Icon iconName="secret" size={100} />
        )}
        <KnownOwnCardText>Team: {capitalize(playerTeam)}</KnownOwnCardText>
        <KnownOwnCardText>Role: {capitalize(playerRole)}</KnownOwnCardText>
      </KnownOwnCardContainer>
    )
  }
)
