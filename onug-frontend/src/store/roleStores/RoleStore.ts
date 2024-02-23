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
        const selectable_cards =
          (lastJsonMessage.interaction.selectable_cards || []).includes(position) || false
        const shielded_cards =
          (lastJsonMessage.interaction.new_shield_card || []).includes(position) || false

        const shield =
          (lastJsonMessage.interaction.shielded_cards || []).includes(position) || false
        const werewolves =
          (lastJsonMessage.interaction.werewolves || []).includes(position) || false
        const dreamwolf =
          (lastJsonMessage.interaction.dreamwolf || []).includes(position) || false

        const tanner =
          (lastJsonMessage.interaction.tanner || []).includes(position) || false
        const mad = (lastJsonMessage.interaction.mad || []).includes(position) || false
        const masons =
          (lastJsonMessage.interaction.masons || []).includes(position) || false

        const showCard = (lastJsonMessage.interaction.show_cards || []).find(
          (showCardObj) => Object.keys(showCardObj)[0] === position
        )
        const id = showCard ? showCard[position] : playerCard.id

        return {
          ...playerCard,
          id,
          selectable_cards,
          shielded_cards,
          shield,
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
        const selectable_cards =
        (lastJsonMessage.interaction.selectable_cards || []).includes(position) || false
        const showCard = (lastJsonMessage.interaction.show_cards || []).find(
          (showCardObj) => Object.keys(showCardObj)[0] === position
        )
        const id = showCard ? showCard[position] : centerCard.id

        return { ...centerCard, id, selectable_cards }
      }
    )

    interactionStore.selectableCenterCardLimit =
      lastJsonMessage.interaction.selectable_card_limit?.center
    interactionStore.selectablePlayerCardLimit =
      lastJsonMessage.interaction.selectable_card_limit?.player
    gameBoardStore.setPlayerCards(playerCards)
    gameBoardStore.setCenterCards(centerCards)
    gameBoardStore.setKnownPlayer({
      player_name: lastJsonMessage.interaction?.player_name,
      player_number: lastJsonMessage.interaction?.player_number,
      player_original_id: lastJsonMessage.interaction?.player_original_id,
      player_card_id: lastJsonMessage.interaction?.player_card_id,
      player_role: lastJsonMessage.interaction?.player_role,
      player_role_id: lastJsonMessage.interaction?.player_role_id,
      player_team: lastJsonMessage.interaction?.player_team,
    })
  }
}

export default RoleStore
export const roleStore = new RoleStore()
