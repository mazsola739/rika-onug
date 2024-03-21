import { describe, it } from 'node:test'
import { strictEqual, deepEqual } from 'node:assert'
import { moveCards } from '../../../src/utils/scene-utils"

describe("Test scene utils", () => {
    it("moveCards should correctly move player cards, while the mark should remain.", () => {
        const testData = [
            {
                cards: {
                    "center_left": {
                        "card": {
                            "id": 14,
                            "role": "VILLAGER",
                            "team": "village"
                        }
                    },
                    "center_middle": {
                        "card": {
                            "id": 6,
                            "role": "MASON",
                            "team": "village"
                        }
                    },
                    "center_right": {
                        "card": {
                            "id": 13,
                            "role": "VILLAGER",
                            "team": "village"
                        }
                    },
                    "center_wolf": {
                        "card": {
                            "id": 0,
                            "role": "",
                            "team": ""
                        }
                    },
                    "center_villain": {
                        "card": {
                            "id": 0,
                            "role": "",
                            "team": ""
                        }
                    },
                    "player_1": {
                        "card": {
                            "id": 31,
                            "role": "CUPID",
                            "team": "village"
                        },
                        "mark": "mark_of_clarity"
                    },
                    "player_2": {
                        "card": {
                            "id": 64,
                            "role": "MIRROR_MAN",
                            "team": "hero"
                        },
                        "mark": "mark_of_fear"
                    },
                    "player_3": {
                        "card": {
                            "id": 12,
                            "role": "VILLAGER",
                            "team": "village"
                        },
                        "mark": "mark_of_love"
                    }
                },
                direction: 'right',
                currentPlayer: 'player_1',
                expectedUpdatedPlayerCards: {
                    "player_1": {
                        "card": {
                            "id": 31,
                            "role": "CUPID",
                            "team": "village"
                        },
                        "mark": "mark_of_clarity",
                    },
                    "player_2": {
                        "card": {
                            "id": 12,
                            "role": "VILLAGER",
                            "team": "village"
                        },
                        "mark": "mark_of_fear",
                    },
                    "player_3": {
                        "card": {
                            "id": 64,
                            "role": "MIRROR_MAN",
                            "team": "hero"
                        },
                        "mark": "mark_of_love",
                    },
                },
            },
        ]
        testData.forEach(data => {
            const { cards, direction, currentPlayer, expectedUpdatedPlayerCards } = data
            console.log(`testing move cards:
cards:
${JSON.stringify(cards, null, 4)}

direction
${direction}

currentPlayer
${currentPlayer}

expectedUpdatedPlayerCards
${JSON.stringify(expectedUpdatedPlayerCards, null, 4)}`)

            const movedCards = moveCards(cards, direction, currentPlayer)

            console.log(`___MOVED__CARDS___
${JSON.stringify(movedCards, null, 4)}`)
            deepEqual(movedCards, expectedUpdatedPlayerCards)
        })
    })
})
