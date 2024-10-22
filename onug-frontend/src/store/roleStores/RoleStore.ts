import { makeAutoObservable } from 'mobx'
import { boardStore, interactionStore } from 'store'
import { CenterPositionProperties, PlayerPositionProperties, WsJsonMessage } from 'types'

class RoleStore {
  constructor() {
    makeAutoObservable(this)
  }

  openYourEyes(lastJsonMessage: WsJsonMessage): void {
    const answerOptions: string[] = lastJsonMessage.interaction.answer_options || []

    const playerCards: PlayerPositionProperties[] = boardStore.playerCards.map(
      (playerCard) => {
        const { position } = playerCard

        const selectable_cards = (lastJsonMessage.interaction.selectable_cards || []).includes(position) || false
        const selectable_marks = (lastJsonMessage.interaction.selectable_marks || []).includes(position) || false
        const shield = (lastJsonMessage.interaction.shielded_cards || []).includes(position) || false
        const artifact = (lastJsonMessage.interaction.artifacted_cards || []).includes(position) || false

        const fang = (lastJsonMessage.interaction.mark_of_vampire || []).includes(position) || false
        const fear = (lastJsonMessage.interaction.mark_of_fear || []).includes(position) || false
        const bat = (lastJsonMessage.interaction.mark_of_bat || []).includes(position) || false
        const diseased = (lastJsonMessage.interaction.mark_of_disease || []).includes(position) || false
        const cupid = (lastJsonMessage.interaction.mark_of_love || []).includes(position) || false
        const traitor = (lastJsonMessage.interaction.mark_of_traitor || []).includes(position) || false
        const clarity = (lastJsonMessage.interaction.mark_of_clarity || []).includes(position) || false
        const target = (lastJsonMessage.interaction.mark_of_assassin || []).includes(position) || false

        const showCard = (lastJsonMessage.interaction.show_cards || []).find((showCardObj) => Object.keys(showCardObj)[0] === position)
        const cardId = showCard ? showCard[position] : playerCard.id
        const showMark = (lastJsonMessage.interaction.show_marks || []).find((showMarkObj) => Object.keys(showMarkObj)[0] === position)
        const markId = showMark ? showMark[position] : playerCard.mark

        return {
          ...playerCard,
          cardId,
          markId,
          selectable_cards,
          selectable_marks,

          shield,
          artifact,

          fang,
          fear,
          bat,
          diseased,
          cupid,
          traitor,
          clarity,
          target
        }
      }
    )

    const centerCards: CenterPositionProperties[]  = boardStore.centerCards.map(
      (centerCard) => {
        const { position } = centerCard

        const selectable_cards = (lastJsonMessage.interaction.selectable_cards || []).includes(position) || false

        const showCard = (lastJsonMessage.interaction.show_cards || []).find((showCardObj) => Object.keys(showCardObj)[0] === position)
        const cardId = showCard ? showCard[position] : centerCard.id

        return { 
          ...centerCard, 
          cardId, 
          selectable_cards,
        }
      }
    )

    interactionStore.selectableCenterCardLimit = lastJsonMessage.interaction.selectable_card_limit?.center
    interactionStore.selectablePlayerCardLimit = lastJsonMessage.interaction.selectable_card_limit?.player
    interactionStore.selectableMarkLimit = lastJsonMessage.interaction.selectable_mark_limit?.mark
    boardStore.setAnswerOptions(answerOptions)
    boardStore.setPlayerCards(playerCards)
    boardStore.setCenterCards(centerCards)
    boardStore.setKnownPlayer({
      player_name: lastJsonMessage.interaction?.player_name,
      player_number: lastJsonMessage.interaction?.player_number,
      player_original_id: lastJsonMessage.interaction?.player_original_id,
      player_card_id: lastJsonMessage.interaction?.player_card_id,
      player_role: lastJsonMessage.interaction?.player_role,
      player_role_id: lastJsonMessage.interaction?.player_role_id,
      player_team: lastJsonMessage.interaction?.player_team,
      player_mark: lastJsonMessage.interaction?.player_mark,
    })
  }
}

export default RoleStore
export const roleStore = new RoleStore()
