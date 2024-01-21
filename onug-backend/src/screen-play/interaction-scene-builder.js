const { logTrace } = require("../log")
const {
    getCardPositionNamesForPlayers,
    cardIdToTokenBuilder,
    getWerewolfCardPositionNamesForPlayers,
    multipleWerewolvesAtPlay,
    getCenterCardPositions,
    getMasonCardPositionNamesForPlayers,
    getAllPositions,
} = require("../utils")
const actions = require("../constant/actions")
const noOperation = scene_name => ( {
    type: 'NOOP',
    scene_name,
} )
const generateInteractionScene = (gameState, scene_number) => {
    const scene = gameState.scenes[scene_number]
    const scene_name = scene.scene_name
    const scene_card_ids = scene.scene_card_ids
    if (!scene_card_ids) return [noOperation(scene_name)]

    const playerTokens = scene_card_ids.flatMap(id => {
        const token = gameState.cards[cardIdToTokenBuilder(id)]
        return token ? token : []
    })

    const interactionScenes = []

    playerTokens.forEach(token => {
        const actualPlayerNumber = gameState.players[token].player_number
        //const knownPlayerRole = gameState.players[token].card.known_card.display_name
        logTrace(`actualPlayerNumber: ${actualPlayerNumber} token: ${token} scene_name: ${scene_name}`)
        if (scene_name === 'doppleganger') {
            const positions = getCardPositionNamesForPlayers(gameState, actualPlayerNumber)
            const interactionScene = {
                type: 'CHOOSE_CARD',
                token,
                scene_name,
                board: {
                    cards: {
                        players: []
                    },
                },
            }
            positions.forEach(position => interactionScene.board.cards.players.push({position}))
            interactionScenes.push(interactionScene)
        }
        // show werewolf cards only to doppleganger if doppleganger is now a werewolf
        if (scene_name === 'doppleganger+minion') {// could be merged with werevolves scene, they don't have to wait for each other now
            const positions = getWerewolfCardPositionNamesForPlayers(gameState)
            const interactionScene = {
                type: 'SHOW_CARDS',
                token,
                text: actions.doppelganger.doppelganger_minion_text,
                scene_name,
                board: {
                    cards: {
                        players: []
                    },
                },
            }
            positions.forEach(position => interactionScene.board.cards.players.push({position, card_id: 15}))
            interactionScenes.push(interactionScene)
        }
        if (scene_name === 'werewolf' && multipleWerewolvesAtPlay(Object.values(gameState.players).map((player) => player.card.known_card.id))) {
            const positions = getWerewolfCardPositionNamesForPlayers(gameState)
            const interactionScene = {
                type: 'SHOW_CARDS',
                token,
                scene_name: 'werewolf',
                board: {
                    cards: {
                        players: []
                    },
                },
            }
            positions.forEach(position => interactionScene.board.cards.players.push({position, card_id: 15}))
            interactionScenes.push(interactionScene)
        }
        if (scene_name === 'werewolf' && !multipleWerewolvesAtPlay(Object.values(gameState.players).map((player) => player.card.known_card.id))) {
            const positions = getCenterCardPositions()
            const interactionScene = {
                type: 'CHOOSE_CARDS',
                token,
                scene_name,
                board: {
                    cards: {
                        center: []
                    },
                },
            }
            positions.forEach(position => interactionScene.board.cards.center.push({position}))
            interactionScenes.push(interactionScene)
        }
        if (scene_name === 'minion') { // could be merged with werevolves scene, they don't have to wait for each other now
            const positions = getWerewolfCardPositionNamesForPlayers(gameState)
            const interactionScene = {
                type: 'SHOW_CARDS',
                token,
                scene_name,
                board: {
                    cards: {
                        players: []
                    },
                },
            }
            positions.forEach(position => interactionScene.board.cards.players.push({position, card_id: 15}))
            interactionScenes.push(interactionScene)
        }
        if (scene_name === 'mason') {
            const positions = getMasonCardPositionNamesForPlayers(gameState)
            const interactionScene = {
                type: 'SHOW_CARDS',
                token,
                scene_name,
                board: {
                    cards: {
                        players: []
                    },
                },
            }
            positions.forEach(position => interactionScene.board.cards.players.push({position, card_id: 15}))
            interactionScenes.push(interactionScene)
        }
        if (scene_name === 'seer') {
            const board = getAllPositions(ameState, actualPlayerNumber)
            const interactionScene = {
                type: 'CHOOSE_CARD',
                token,
                scene_name,
                board,
            }
            interactionScenes.push(interactionScene)
        }
        if (scene_name === 'robber') {
            const positions = getCardPositionNamesForPlayers(gameState, actualPlayerNumber)
            const interactionScene = {
                type: 'CHOOSE_CARD',
                token,
                scene_name,
                board: {
                    cards: {
                        players: []
                    },
                },
            }
            positions.forEach(position => interactionScene.board.cards.players.push({position}))
            interactionScenes.push(interactionScene)
        }
        if (scene_name === 'troublemaker') {
            const positions = getCardPositionNamesForPlayers(gameState, actualPlayerNumber)
            const interactionScene = {
                type: 'CHOOSE_TWO_CARDS',
                token,
                scene_name,
                board: {
                    cards: {
                        players: []
                    },
                },
            }
            positions.forEach(position => interactionScene.board.cards.players.push({position}))
            interactionScenes.push(interactionScene)
        }
        if (scene_name === 'drunk') {
            const positions = getCenterCardPositions()
            const interactionScene = {
                type: 'CHOOSE_CARDS',
                token,
                scene_name,
                board: {
                    cards: {
                        center: []
                    },
                },
            }
            positions.forEach(position => interactionScene.board.cards.center.push({position}))
            interactionScenes.push(interactionScene)
        }
        if (scene_name === 'insomniac') {
            const interactionScene = {
                type: 'SHOW_CARDS',
                token,
                scene_name,
                board: {
                    cards: {
                        players: [{position: actualPlayerNumber, card_id: gameState.players[token].cards.actual_card.id}]
                    },
                },
            }
            interactionScenes.push(interactionScene)
        }
    })

    if (!interactionScenes.length) interactionScenes.push(noOperation(scene_name))
    return interactionScenes
}

const interactionSceneBuilder = gameState => {
    const scene_number = gameState.scene_number
    logTrace(`interaction scene builder called scene_number: [${scene_number}]. gameState.interactionScenes[scene_number]: [${gameState.interactionScenes[scene_number]}]`)
    if (gameState.interactionScenes[scene_number]) return gameState

    logTrace(`generate interaction scene for scene_number: [${scene_number}]`)

    gameState.interactionScenes[scene_number] = generateInteractionScene(gameState, scene_number)

    return gameState
}

module.exports = {
    interactionSceneBuilder,
}