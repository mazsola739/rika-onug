import { Button, Card, Footer, ButtonGroup, Token } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { playersStore, deckStore } from 'store'
import { StyledTableFooter, Tokens } from './Table.styles'

export const TableFooter: React.FC = observer(() => {
    const room_id = sessionStorage.getItem('room_id')
    const token = sessionStorage.getItem('token')

    const { handleLeaveTable, handleStartGame, handleReady } = useClickHandler(room_id, token)
    const { player, players } = playersStore

    const card = deckStore.playerCard
    const mark = deckStore.playerMark
    const ready = players?.find(actualPlayer => actualPlayer.player_number === `player_${player.player_number}`).ready

    return (
      <Footer>
        {player && (
          <StyledTableFooter>
            <Card image={card.card_name} size={130} />
            <Tokens>
              <Token tokenName={`${player.player_number}`} size={50} />
              {mark && <Token tokenName={mark.token_name} size={50} />}
            </Tokens>
          </StyledTableFooter>
        )}
        <ButtonGroup>
          <Button onClick={handleLeaveTable} buttonText={BUTTONS.leave_table_label} variant="red" />
          <Button onClick={handleStartGame} buttonText={BUTTONS.start_game_label} variant="purple" />
          <Button onClick={handleReady} variant="green" buttonText={ready ? BUTTONS.im_ready_label : BUTTONS.ready_label} />
        </ButtonGroup>
      </Footer>
    )
  }
)
