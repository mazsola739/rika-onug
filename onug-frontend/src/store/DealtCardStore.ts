import { makeAutoObservable } from 'mobx'

class DealtCardStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default DealtCardStore
export const dealtCardStore = new DealtCardStore()

export const identifier_player1_text = 'Player 1'
export const identifier_player2_text = 'Player 2'
export const identifier_player3_text = 'Player 3'
export const identifier_player4_text = 'Player 4'
export const identifier_player5_text = 'Player 5'
export const identifier_player6_text = 'Player 6'
export const identifier_player7_text = 'Player 7'
export const identifier_player8_text = 'Player 8'
export const identifier_player9_text = 'Player 9'
export const identifier_player10_text = 'Player 10'
export const identifier_player11_text = 'Player 11'
export const identifier_player12_text = 'Player 12'

/* "card_positions": {
    "center_left": {
        "id": 9,
        "role": "SEER",
        "team": "village"
    },
    "center_middle": {
        "id": 6,
        "role": "MASON",
        "team": "village"
    },
    "center_right": {
        "id": 71,
        "role": "APPRENTICE_TANNER",
        "team": "tanner"
    },
    "center_wolf": {
        "id": 0,
        "role": "",
        "team": ""
    },
    "center_villain": {
        "id": 0,
        "role": "",
        "team": ""
    },
    "player_1": {
        "id": 7,
        "role": "MINION",
        "team": "werewolf"
    },
    "player_2": {
        "id": 8,
        "role": "ROBBER",
        "team": "village"
    },
    "player_3": {
        "id": 2,
        "role": "DRUNK",
        "team": "village"
    },
    "player_4": {
        "id": 5,
        "role": "MASON",
        "team": "village"
    },
    "player_5": {
        "id": 4,
        "role": "INSOMNIAC",
        "team": "village"
    },
    "player_6": {
        "id": 11,
        "role": "TROUBLEMAKER",
        "team": "village"
    },
    "player_7": {
        "id": 16,
        "role": "WEREWOLF",
        "team": "werewolf"
    },
    "player_8": {
        "id": 15,
        "role": "WEREWOLF",
        "team": "werewolf"
    }
}
 */
