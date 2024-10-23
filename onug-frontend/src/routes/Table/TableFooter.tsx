import { Footer, FooterButtons, Button, Card, Token } from "components"
import { BUTTONS, ROLES } from "constant"
import { useClickHandler } from "hooks"
import { observer } from "mobx-react-lite"
import { deckStore, boardStore } from "store"
import React from "react"
import { StyledTableFooter, Player, PlayerCardRule, PlayerInfo, Tokens } from "./Table.styles"

export const TableFooter: React.FC = observer(() => {
    const room_id = sessionStorage.getItem('room_id')
    const token = sessionStorage.getItem('token')

    const { handleLeaveTable, handleStartGame, handleReady } = useClickHandler(room_id, token)
    const { player, players } = boardStore

    const card = player?.player_card_id ? deckStore.getCardById(player.player_card_id) : null

    const roleName = ROLES[`role_${player?.player_role.toLowerCase().replace('_', '')}` as keyof typeof ROLES]
    
    const ready = players?.find(actualPlayer => actualPlayer.player_number === `player_${player.player_number}`).ready

    const mark = player?.player_mark

    return (
      <Footer>
        {player && (
            <StyledTableFooter>
              <PlayerInfo>
                <Player>Name: {player.player_name}</Player>
                <Tokens>
                  <Token tokenName={`${player.player_number}`} size={50} />
                  {mark && <Token tokenName={mark} size={50} />}
                  {/* artifact */}
                  {/* shield */}
                </Tokens>
                <Player>Role: {roleName}</Player>
              </PlayerInfo>
              <Card image={card.card_name} size={130} />
              <PlayerCardRule>{card.rules}</PlayerCardRule>
            </StyledTableFooter>
          )}
        <FooterButtons>
          <Button onClick={handleLeaveTable} buttonText={BUTTONS.leave_table_label} variant="red" />
          <Button onClick={handleStartGame} buttonText={BUTTONS.start_game_label} variant="purple" />
          <Button onClick={handleReady} variant="green" buttonText={ ready ? BUTTONS.im_ready_label : BUTTONS.ready_label } />
        </FooterButtons>
      </Footer>
    )
  }
)
