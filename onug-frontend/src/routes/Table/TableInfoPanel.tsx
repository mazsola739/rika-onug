import { CardImage, InfoPanel, QuickGuide, ReadyList, Token } from 'components'
import { ROLES, rules_mark } from 'constant'
import { observer } from 'mobx-react-lite'
import { playersStore, deckStore } from 'store'
import { CardRule, OwnCardInfoName, OwnCardInfoRole, OwnCardInfoTeam, ReadyStatus, StyledOwnCard, TokenRule } from './Table.styles'

const OwnCard: React.FC = observer(() => {
  const { player } = playersStore
  
  const card = deckStore.playerCard
  const mark = deckStore.playerMark
  const roleName = player ? ROLES[`role_${player.player_role.toLowerCase().replace('_', '')}` as keyof typeof ROLES] : ''

  return (
    player && (
      <StyledOwnCard>
        <Token tokenName={`${player.player_number}`} size={30} />
        <OwnCardInfoName>Name: {player.player_name}</OwnCardInfoName>
        <CardImage image={card.card_name} size={100} />
        <OwnCardInfoTeam>Team: {player.player_team}</OwnCardInfoTeam>
        <OwnCardInfoRole>Role: {roleName}</OwnCardInfoRole>
        <CardRule>{card.rules}</CardRule>
        {mark && <Token tokenName={mark.token_name} size={50} />}
        {mark && <TokenRule>{mark.rules}</TokenRule>}
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
