/*  Screenplay steps

=>  BACKEND: check in selected cards, wich role next, (id or role name?)
    FRONTEND: send narration to everyone, 
    BACKEND & FRONTEND: start action timer
=>  BACKEND: check in known cards the player, who has the role, this player can do their action? 
    (some card swaps not allow to wake up again),if there player with doable action, generate this action 
=>  FRONTEND: send invidiually to this player message (YOUR TURN), selectable and/or visible options, 
    and / or message about action (example, swap is already done)
=>  BACKEND: wait (until timer) answer from player if need (selected option, card ect.), 
    FRONTEND: and react to their action if need (example select card to look at, we need to show this card) and send message
=>  BACKEND: update changes in storage (player or center card informations)
=>  BACKEND & FRONTEND: timer finish, (if player failed do their action, send a message about missed opportunity,) 
    BACKEND: reset, and move to next action, repeat steps  */

    
/* Storage plan:
{
  flipped: [{position: card_id}]
  artifact: [{position: true?}]
  shield: [{position: true?}]
  player_1: {
      card_history: [{sceen: 0, id: }]
      known card: {
        id:
        card: {role: , team: }, 
        player: {role: , team: }, 
        mark: 
      },
      actual card: {
        id:
        card: {role: , team: }, 
        player: {role: , team: }, 
        mark: 
      },
    }
  },

  center_cards: {
    center_left: {                         //center_wolf, center_villain, center_middle, center_right
      id
      card: {role: , team: },
    }
} */

/* Communication plan
send to frontend: broadcast to everyone, message to the selected player(s), "question" and position list to their action (selectable or visible positions), 
send to backend: "answer" with selected position list
send to frontend: confirm action if need in message to the selected player(s) and/or show the result (example: show selected card secretly)
*/


const { sceneBuilder } = require('./scene-builder')
const { interactionProvider } = require('./interaction-provider')
const { startGamePlay, stopGamePlay } = require('./game-play')

module.exports = {
    sceneBuilder,
    interactionProvider,
    startGamePlay,
    stopGamePlay,
}