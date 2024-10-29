import { CardImage, InfoPanel, QuickGuide, ReadyList, Token } from 'components'
import { ROLES, rules_mark } from 'constant'
import { observer } from 'mobx-react-lite'
import { playersStore, deckStore } from 'store'
import { CardRule, OwnCardInfoName, OwnCardInfoRole, OwnCardInfoTeam, ReadyStatus, StyledOwnCard, TokenRule } from './Table.styles'

const OwnCard: React.FC = observer(() => {
  const { player } = playersStore
  const card = player ? deckStore.getCardById(player.player_card_id) : null
  const roleName = player ? ROLES[`role_${player.player_role.toLowerCase().replace('_', '')}` as keyof typeof ROLES] : ''
  const mark = player ? player.player_mark : ''

  return (
    player && (
      <StyledOwnCard>
        <Token tokenName={`${player.player_number}`} size={30} />
        <OwnCardInfoName>Name: {player.player_name}</OwnCardInfoName>
        <CardImage image={card.card_name} size={100} />
        <OwnCardInfoTeam>Team: {player.player_team}</OwnCardInfoTeam>
        <OwnCardInfoRole>Role: {roleName}</OwnCardInfoRole>
        <CardRule>{card.rules}</CardRule>
        {mark && <Token tokenName={'mark_of_clarity'} size={50} />}
        {mark && <TokenRule>{rules_mark.rules_clarity}</TokenRule>}
      </StyledOwnCard>
    )
  )
})

export const TableInfoPanel: React.FC = observer(() => {
  const { players } = playersStore

  return (
    <InfoPanel>
      <ReadyStatus>{players && <ReadyList players={players} />}</ReadyStatus>
      <OwnCard />
      <QuickGuide />
    </InfoPanel>
  )
})
