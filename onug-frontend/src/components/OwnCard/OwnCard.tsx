
import { CardImage, Token } from 'components'
import { observer } from 'mobx-react-lite'
import { CardRule, KnownCard, OwnCardInfoName, OwnCardInfoRole, OwnCardInfoTeam, StyledOwnCard, TokenRule } from './OwnCard.styles'
import { OwnCardProps } from './OwnCard.types'

export const OwnCard: React.FC<OwnCardProps> = observer(({ card, mark, player }) => {

  const playerNumber = player?.player_number?.replace(/^player_/, "")
  
    return (
      player && (
        <StyledOwnCard>
          <KnownCard>YOUR KNOWN CARD</KnownCard>
          <Token tokenName={playerNumber} size={25} />
          <OwnCardInfoName>{player.player_name}</OwnCardInfoName>
          <CardImage image={card.card_name} size={100} />
          <OwnCardInfoTeam>Team: {player.player_team}</OwnCardInfoTeam>
          <OwnCardInfoRole>Role: {player.player_role}</OwnCardInfoRole>
          <CardRule>{card.rules}</CardRule>
          {mark && <Token tokenName={mark.token_name} size={50} />}
          {mark && <TokenRule>{mark.rules}</TokenRule>}
        </StyledOwnCard>
      )
    )
  })