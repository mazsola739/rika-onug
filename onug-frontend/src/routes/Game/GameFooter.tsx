import { Button, Card, Footer, ButtonGroup, Token } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { playersStore, deckStore, gamePlayStore } from 'store'
import { StyledGameFooter, Tokens } from './Game.styles'

export const GameFooter: React.FC = observer(() => {
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')
  const buttonText = gamePlayStore.isGamePlayPaused ? BUTTONS.pause_button_alt_label : BUTTONS.pause_button_label

  const { handlePauseGame, handleStopGame } = useClickHandler(room_id, token)
  const { player } = playersStore

  const card = deckStore.playerCard
  const cardName = card.card_name ? card.card_name : 'card_background'
  const mark = deckStore.playerMark
  const markName = mark.token_name ? mark.token_name : 'mark_back'

  return (
    <Footer>
      {player && (
        <StyledGameFooter>
          <Card image={cardName} size={130} />
          <Tokens>
            <Token tokenName={`${player.player_number}`} size={50} />
            {mark && <Token tokenName={markName} size={50} />}
            {/* artifact */}
            {/* shield */}
          </Tokens>
        </StyledGameFooter>
      )}
      <ButtonGroup>
        <Button onClick={handlePauseGame} buttonText={buttonText} variant="orange" />
        <Button onClick={handleStopGame} buttonText={BUTTONS.stop_button_label} variant="red" />
      </ButtonGroup>
    </Footer>
  )
})
