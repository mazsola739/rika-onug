import { CardImage, Icon } from 'components'
import { observer } from 'mobx-react-lite'
import { deckStore } from 'store'
import { capitalize } from 'utils'
import { KnownOwnCardContainer, KnownOwnInfos, KnownOwnCardText } from './KnownOwnCard.styles'
import { KnownOwnCardProps } from './KnownOwnCard.types'
//TODO role id
export const KnownOwnCard: React.FC<KnownOwnCardProps> = observer(
  ({ player }) => {
    const card = player?.player_card_id
      ? deckStore.getCardById(player.player_card_id)
      : null

    const mark = player?.player_mark ? capitalize(player.player_mark) : null

    const playerNumber = player?.player_number || ''
    const playerName = player?.player_name || ''
    const playerTeam = player?.player_team || ''
    const playerRole = player?.player_role || ''
    const original = deckStore.getCardById(player?.player_original_id)?.display_name || ''

    return (
      <KnownOwnCardContainer>
        {player?.player_card_id > 0 ? (
          <CardImage image={card?.card_name} size={80}></CardImage>
        ) : (
          <Icon iconName="secret" size={80} />
        )}
        <KnownOwnInfos>
          <KnownOwnCardText>Player {playerNumber}: {playerName}</KnownOwnCardText>
          <KnownOwnCardText>{capitalize(original)}</KnownOwnCardText>
          <KnownOwnCardText>Team: {capitalize(playerTeam)}</KnownOwnCardText>
          <KnownOwnCardText>Role: {capitalize(playerRole)}</KnownOwnCardText>
          {mark && <KnownOwnCardText>Mark: {mark}</KnownOwnCardText>}
        </KnownOwnInfos>
      </KnownOwnCardContainer>
    )
  }
)
