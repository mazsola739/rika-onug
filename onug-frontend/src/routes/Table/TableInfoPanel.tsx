import { CardImage, InfoPanel, QuickGuide, ReadyList, Token } from 'components'
import { ROLES, rules_mark } from 'constant'
import { observer } from 'mobx-react-lite'
import { boardStore, deckStore } from 'store'
import { OwnCardInfo, Rule, ReadyStatus, StyledOwnCard } from './Table.styles'

const OwnCard: React.FC = observer(() => {
  const { player } = boardStore
  const card = player ? deckStore.getCardById(player.player_card_id) : null
  const roleName = player ? ROLES[`role_${player.player_role.toLowerCase().replace('_', '')}` as keyof typeof ROLES] : ''
  const mark = player ? player.player_mark : ''

  return (
    player && (
      <StyledOwnCard>
        <Token tokenName={`${player.player_number}`} size={30} />
        <OwnCardInfo>Name: {player.player_name}</OwnCardInfo>
        <CardImage image={card.card_name} size={100} />
        <OwnCardInfo>Team: {player.player_team}</OwnCardInfo>
        <OwnCardInfo>Role: {roleName}</OwnCardInfo>
        <Rule>{card.rules}</Rule>
        {mark && <Token tokenName={'mark_of_clarity'} size={50} />}
        {mark && <Rule>{rules_mark.rules_clarity}</Rule>}
      </StyledOwnCard>
    )
  )
})

export const TableInfoPanel: React.FC = observer(() => {
  const { players } = boardStore

  return (
    <InfoPanel>
      <ReadyStatus>{players && <ReadyList players={players} />}</ReadyStatus>
      <OwnCard />
      <QuickGuide />
    </InfoPanel>
  )
})
