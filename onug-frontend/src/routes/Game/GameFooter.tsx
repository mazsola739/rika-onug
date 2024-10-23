import { Footer, FooterButtons, Button, Token, Card } from 'components'
import { BUTTONS, ROLES } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { boardStore, deckStore, gamePlayStore } from 'store'
import { Player, PlayerInfo, StyledGameFooter, Tokens } from './Game.styles'

export const GameFooter: React.FC = observer(() => {
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')
  const buttonText = gamePlayStore.isGamePlayPaused ? BUTTONS.pause_button_alt_label : BUTTONS.pause_button_label

  const { handlePauseGame, handleStopGame } = useClickHandler(room_id, token)
  const { player } = boardStore

  const card = player?.player_card_id ? deckStore.getCardById(player.player_card_id) : null
  const roleName = ROLES[`role_${player?.player_role.toLowerCase().replace('_', '')}` as keyof typeof ROLES]
  const mark = player?.player_mark

  return (
    <Footer>
      {player && (
        <StyledGameFooter>
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
        </StyledGameFooter>
      )}
      <FooterButtons>
        <Button
          onClick={handlePauseGame}
          buttonText={buttonText}
          variant="orange"
        />
        <Button
          onClick={handleStopGame}
          buttonText={BUTTONS.stop_button_label}
          variant="red"
        />
      </FooterButtons>
    </Footer>
  )
})
