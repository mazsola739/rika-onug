import { makeAutoObservable } from 'mobx'
import { gameBoardStore } from 'store/GameBoardStore'
import { interactionStore } from 'store/InteractionStore'
import { WsJsonMessage, PositionProperties } from 'types'

class DoppelgangerStore {
  constructor() {
    makeAutoObservable(this)
  }

  openYourEyes(lastJsonMessage: WsJsonMessage): void {
    const playerCards: PositionProperties[] = gameBoardStore.playerCards.map(
      (playerCard) => {
        const { position } = playerCard
        const shield =
          lastJsonMessage.shielded_players?.includes(playerCard.position) ||
          false
        const selectable =
          lastJsonMessage.selectable_cards?.includes(position) || false
        const showCard = lastJsonMessage.show_cards?.find(
          (showCardObj) => Object.keys(showCardObj)[0] === position
        )
        const id = showCard ? (showCard as Record<string, number>)[position] : 0

        return { ...playerCard, shield, selectable, id }
      }
    )

    interactionStore.selectablePlayerCardLimit = 1
    gameBoardStore.setPlayerCards(playerCards)
    gameBoardStore.setKnownPlayer({
      player_name: lastJsonMessage.player_name,
      player_number: lastJsonMessage.player_number,
      player_card_id: lastJsonMessage.player_card_id,
      player_original_id: lastJsonMessage.player_original_id,
      player_role: lastJsonMessage.player_role,
      player_role_id: lastJsonMessage.player_role_id,
      player_team: lastJsonMessage.player_team,
    })
  }

  /**
   * * Doppelgänger instant night actions:
   * ? 2 Drunk, 8 Robber, 9 Seer , 11 Troublemaker, 17 Alpha wolf, 18 Apprenticeseer, 22 Mystic wolf,
   * ? 23 Paranormal investigator, 25 Sentinel, 26 Village idiot, 27 Witch, 31 Cupid, 32 Diseased,
   * ? 34 Instigator, 55 Annoyinglad, 56 Detector, 57 Dr peeker, 65 Rapscallion, 66 Role retriever,
   * ? 68 Switcheroo, 69 Temptress, 70 Voodoolou, 85 Thing
   * */

  instantNightAction(lastJsonMessage: WsJsonMessage): void {
    const playerCards: PositionProperties[] = gameBoardStore.playerCards.map(
      (playerCard) => {
        const shield =
          lastJsonMessage.shielded_players?.includes(playerCard.position) ||
          false

        return { ...playerCard, shield }
      }
    )

    gameBoardStore.setPlayerCards(playerCards)

    const new_role_id = lastJsonMessage.new_role_id

    if (new_role_id === 2) return interactionStore.setInteraction('DRUNK')
    if (new_role_id === 8) return interactionStore.setInteraction('ROBBER')
    if (new_role_id === 9) return interactionStore.setInteraction('SEER')
    if (new_role_id === 11)
      return interactionStore.setInteraction('TROUBLEMAKER')
    if (new_role_id === 17) return interactionStore.setInteraction('ALPHA_WOLF')
    if (new_role_id === 18)
      return interactionStore.setInteraction('APPRENTICE_SEER')
    if (new_role_id === 22)
      return interactionStore.setInteraction('MYSTIC_WOLF')
    if (new_role_id === 23)
      return interactionStore.setInteraction('PARANORMAL_INVESTIGATOR')
    if (new_role_id === 25) return interactionStore.setInteraction('SENTINEL')
    if (new_role_id === 26)
      return interactionStore.setInteraction('VILLAGE_IDIOT')
    if (new_role_id === 27) return interactionStore.setInteraction('WITCH')
    if (new_role_id === 31) return interactionStore.setInteraction('CUPID')
    if (new_role_id === 32) return interactionStore.setInteraction('DISEASED')
    if (new_role_id === 34) return interactionStore.setInteraction('INSTIGATOR')
    if (new_role_id === 55)
      return interactionStore.setInteraction('ANNOYING_LAD')
    if (new_role_id === 56) return interactionStore.setInteraction('DETECTOR')
    if (new_role_id === 57) return interactionStore.setInteraction('DR_PEEKER')
    if (new_role_id === 65)
      return interactionStore.setInteraction('RAPSCALLION')
    if (new_role_id === 66)
      return interactionStore.setInteraction('ROLE_RETRIEVER')
    if (new_role_id === 68) return interactionStore.setInteraction('SWITCHEROO')
    if (new_role_id === 69) return interactionStore.setInteraction('TEMPTRESS')
    if (new_role_id === 70) return interactionStore.setInteraction('VOODOO_LOU')
    if (new_role_id === 85) return interactionStore.setInteraction('THING')

    gameBoardStore.setKnownPlayer({
      player_name: lastJsonMessage.player_name,
      player_number: lastJsonMessage.player_number,
      player_card_id: lastJsonMessage.player_card_id,
      player_original_id: lastJsonMessage.player_original_id,
      player_role: lastJsonMessage.player_role,
      player_role_id: lastJsonMessage.player_role_id,
      player_team: lastJsonMessage.player_team,
    })
  }
}

export default DoppelgangerStore
export const doppelgangerStore = new DoppelgangerStore()
