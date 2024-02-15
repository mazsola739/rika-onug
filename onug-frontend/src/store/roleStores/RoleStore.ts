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
        const vampires =
          (lastJsonMessage.vampires || []).includes(position) || false
        const fang = (lastJsonMessage.fang || []).includes(position) || false
        const fear = (lastJsonMessage.fear || []).includes(position) || false
        const bat = (lastJsonMessage.bat || []).includes(position) || false
        const diseased =
          (lastJsonMessage.diseased || []).includes(position) || false
        const lovers =
          (lastJsonMessage.lovers || []).includes(position) || false
        const traitor =
          (lastJsonMessage.traitor || []).includes(position) || false
        const clarity =
          (lastJsonMessage.clarity || []).includes(position) || false
        const assassin =
          (lastJsonMessage.assassin || []).includes(position) || false
        const target =
          (lastJsonMessage.target || []).includes(position) || false
        const shield =
          (lastJsonMessage.shielded_cards || []).includes(position) || false
        const aliens =
          (lastJsonMessage.aliens || []).includes(position) || false
        //NEW alien / helper
        const cow = (lastJsonMessage.cow || []).includes(position) || false
        //GROOB ZERB
        const villains =
          (lastJsonMessage.villains || []).includes(position) || false
        //new VILLAIN
        //evilometer
        const werewolves =
          (lastJsonMessage.werewolves || []).includes(position) || false
        const dreamwolf =
          (lastJsonMessage.dreamwolf || []).includes(position) || false
        //NEW wolf
        const tanner =
          (lastJsonMessage.tanner || []).includes(position) || false
        const mad = (lastJsonMessage.mad || []).includes(position) || false
        const masons =
          (lastJsonMessage.masons || []).includes(position) || false
        const tap =
          (lastJsonMessage.tapped_player || []).includes(position) || false
        const seer = (lastJsonMessage.seer || []).includes(position) || false
        //EMPATH icons
        const artifact =
          (lastJsonMessage.artifact || []).includes(position) || false
        const blob = (lastJsonMessage.blob || []).includes(position) || false
        const mortician =
          (lastJsonMessage.mortician || []).includes(position) || false
        const family =
          (lastJsonMessage.family || []).includes(position) || false
        const selectable =
          (lastJsonMessage.selectable_cards || []).includes(position) || false
        const spy =
          (lastJsonMessage.viewed_cards || []).includes(position) || false

        const showCard = (lastJsonMessage?.show_cards || []).find(
          (showCardObj) => Object.keys(showCardObj)[0] === position
        )
        const id = showCard ? showCard[position] : playerCard.id

        return {
          ...playerCard,
          id,
          spy,
          selectable,
          aliens,
          artifact,
          assassin,
          //awesome,
          //babyalien,
          bat,
          blob,
          //bulb,
          clarity,
          //claw,
          cow,
          diseased,
          dreamwolf,
          //dress,
          //drunk,
          //empath,
          //evil,
          family,
          fang,
          fear,
          //friend,
          //jest,
          //like,
          lovers,
          masons,
          mad,
          mortician,
          //nice,
          //pretty,
          seer,
          //select,
          shield,
          //smell,
          //sus,
          //swap,
          tanner,
          tap,
          target,
          traitor,
          //trophy,
          //ufo,
          vampires,
          villains,
          werewolves,
        }
      }
    )

    const centerCards: PositionProperties[] = gameBoardStore.centerCards.map(
      (centerCard) => {
        const { position } = centerCard
        const selectable =
          lastJsonMessage?.selectable_cards?.includes(position) || false
        const spy =
          (lastJsonMessage.viewed_cards || []).includes(position) || false
        const showCard = (lastJsonMessage?.show_cards || []).find(
          (showCardObj) => Object.keys(showCardObj)[0] === position
        )
        const id = showCard ? showCard[position] : centerCard.id

        return { ...centerCard, id, spy, selectable }
      }
    )

    interactionStore.selectableCenterCardLimit =
      lastJsonMessage.selectable_card_limit?.center
    interactionStore.selectablePlayerCardLimit =
      lastJsonMessage.selectable_card_limit?.player
    gameBoardStore.setPlayerCards(playerCards)
    gameBoardStore.setCenterCards(centerCards)
    gameBoardStore.setKnownPlayer({
      player_name: lastJsonMessage.player_name,
      player_number: lastJsonMessage.player_number,
      player_original_id: lastJsonMessage.player_original_id,
      player_card_id: lastJsonMessage.player_card_id,
      player_role: lastJsonMessage.player_role,
      player_role_id: lastJsonMessage.player_role_id,
      player_team: lastJsonMessage.player_team,
    })
  }
}

export default RoleStore
export const roleStore = new RoleStore()
