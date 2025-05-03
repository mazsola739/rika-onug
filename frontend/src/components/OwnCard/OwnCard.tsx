import { CardImage, TokenImage } from 'components'
import { observer } from 'mobx-react-lite'
import { Title } from 'typography'
import { StyledOwnCard, OwnCardInfoName, OwnCardInfoRole, OwnCardInfoTeam, CardRule, TokenContainer, TokenInfo, TokenRule } from './OwnCard.styles'
import { OwnCardProps } from './OwnCard.types'

export const OwnCard: React.ComponentType<OwnCardProps> = observer(({ card, mark, player, artifact, title }) => {
  const playerNumber = player?.player_number?.replace(/^player_/, '')

  //TODO sort rule
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
        <TokenContainer>
          {mark && (
            <TokenInfo>
              <TokenImage image={mark.token_name} size={40} />
              <TokenRule>{mark.rules}</TokenRule>
            </TokenInfo>
          )}
          {artifact && (
            <TokenInfo>
              <TokenImage image={artifact.token_name} size={40} />
              <TokenRule>{artifact.rules}</TokenRule>
            </TokenInfo>
          )}
        </TokenContainer>
      </StyledOwnCard>
    )
  )
})
