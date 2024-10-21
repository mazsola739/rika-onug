import { Header, Token, RoleImage } from "components"
import { ROLES } from "constant"
import { observer } from "mobx-react-lite"
import { deckStore } from "store"
import { StyledGameTableHeader, PlayerInfo, PlayerName, PlayerCardInfo, PlayerCardRule } from "./Table.styles"
import { TableHeaderProp } from "./Table.types"

export const TableHeader: React.FC<TableHeaderProp> = observer(
  ({ player }) => {
    const card = player?.player_card_id
      ? deckStore.getCardById(player.player_card_id)
      : null
    //Todo wining condition
    //TODO Add mark
    //TODO roles names here
    const roleName = ROLES[`role_${player?.player_role.toLowerCase().replace('_', '')}` as keyof typeof ROLES]

    return (
      <Header>
        {player && (
          <StyledGameTableHeader>
            <PlayerInfo>
              <Token tokenName={`${player.player_number}`} size={50} />
              <PlayerName>{player.player_name}</PlayerName>
            </PlayerInfo>
            <PlayerCardInfo>
              <RoleImage image={card.card_name} size={100} />
              <PlayerCardRule>{`${roleName.toUpperCase()}: ${card.rules}`}</PlayerCardRule>
            </PlayerCardInfo>
          </StyledGameTableHeader>
        )}
      </Header>
    )
  }
)
