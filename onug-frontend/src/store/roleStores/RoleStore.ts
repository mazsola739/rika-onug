import { makeAutoObservable } from 'mobx'
import { interactionStore } from 'store'
import { gameBoardStore } from 'store/GameBoardStore'
import { WsJsonMessage, PositionProperties } from 'types'

class RoleStore {
  constructor() {
    makeAutoObservable(this)
  }

  openYourEyes(lastJsonMessage: WsJsonMessage): void {
    const playerCards: PositionProperties[] = gameBoardStore.playerCards.map(
      (playerCard) => {
        const { position } = playerCard
        const werewolves =
          (lastJsonMessage.werewolves || []).includes(position) || false
        const dreamwolf =
          (lastJsonMessage.dreamwolf || []).includes(position) || false

        const tanner =
          (lastJsonMessage.tanner || []).includes(position) || false
        const mad = (lastJsonMessage.mad || []).includes(position) || false
        const masons =
          (lastJsonMessage.masons || []).includes(position) || false
        const selectable_cards =
          (lastJsonMessage.selectable_cards || []).includes(position) || false
        const showCard = (lastJsonMessage.show_cards || []).find(
          (showCardObj) => Object.keys(showCardObj)[0] === position
        )
        const id = showCard ? showCard[position] : playerCard.id

        return {
          ...playerCard,
          id,
          selectable_cards,
          /* spy,
          aliens,
          artifact,
          assassin, */
          //awesome,
          //babyalien,
          /* bat,
          blob, */
          //bulb,
          //clarity,
          //claw,
          /*  cow,
          diseased, */
          dreamwolf,
          //dress,
          //drunk,
          //empath,
          //evil,
          /* family,
          fang,
          fear, */
          //friend,
          //jest,
          //like,
          /*  lovers, */
          masons,
          mad,
          /*  mortician, */
          //nice,
          //pretty,
          /*  seer, */
          //select,
          /*   shield, */
          //smell,
          //sus,
          //swap,
          tanner,
          /*  tap,
          target,
          traitor, */
          //trophy,
          //ufo,
          /* vampires,
          villains, */
          werewolves,
        }
      }
    )

    const centerCards: PositionProperties[] = gameBoardStore.centerCards.map(
      (centerCard) => {
        const { position } = centerCard
        console.log(position)
        const selectable_cards =
          lastJsonMessage?.selectable_cards?.includes(position) || false
        console.log(selectable_cards)
        const showCard = (lastJsonMessage?.show_cards || []).find(
          (showCardObj) => Object.keys(showCardObj)[0] === position
        )
        const id = showCard ? showCard[position] : centerCard.id

        return { ...centerCard, id, selectable_cards }
      }
    )

    interactionStore.selectableCenterCardLimit =
      lastJsonMessage.selectable_card_limit?.center
    interactionStore.selectablePlayerCardLimit =
      lastJsonMessage.selectable_card_limit?.player
    gameBoardStore.setPlayerCards(playerCards)
    gameBoardStore.setCenterCards(centerCards)
    gameBoardStore.setKnownPlayer({
      player_name: lastJsonMessage?.player_name,
      player_number: lastJsonMessage?.player_number,
      player_original_id: lastJsonMessage?.player_original_id,
      player_card_id: lastJsonMessage?.player_card_id,
      player_role: lastJsonMessage?.player_role,
      player_role_id: lastJsonMessage?.player_role_id,
      player_team: lastJsonMessage?.player_team,
    })
  }
}

export default RoleStore
export const roleStore = new RoleStore()
