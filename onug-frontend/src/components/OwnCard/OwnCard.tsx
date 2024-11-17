import { CardImage, Title, TokenImage } from 'components'
import { observer } from 'mobx-react-lite'
import { CardRule, OwnCardInfoName, OwnCardInfoRole, OwnCardInfoTeam, StyledOwnCard, TokenRule } from './OwnCard.styles'
import { OwnCardProps } from './OwnCard.types'

export const OwnCard: React.FC<OwnCardProps> = observer(({ card, mark, player, artifact, title }) => {
  const playerNumber = player?.player_number?.replace(/^player_/, '')

  //TODO wining condition by card
  return (
    player && (
      <StyledOwnCard>
        <Title title={title} />
        <TokenImage image={playerNumber} size={25} />
        <OwnCardInfoName>{player.player_name}</OwnCardInfoName>
        <CardImage image={card.card_name} size={100} />
        <OwnCardInfoRole>Role: {player.player_role}</OwnCardInfoRole>
        <OwnCardInfoTeam>Team: {player.player_team}</OwnCardInfoTeam>
        <CardRule>{card.rules}</CardRule>
        {mark && <TokenImage image={mark.token_name} size={50} />}
        {mark && <TokenRule>{mark.rules}</TokenRule>}
        {artifact && <TokenImage image={artifact.token_name} size={50} />}
        {artifact && <TokenRule>{artifact.rules}</TokenRule>}
      </StyledOwnCard>
    )
  )
})
