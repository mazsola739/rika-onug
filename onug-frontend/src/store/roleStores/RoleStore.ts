import { makeAutoObservable } from 'mobx'
import { gameBoardStore, interactionStore } from 'store'
import { CenterPositionProperties, PlayerPositionProperties, WsJsonMessage } from 'types'

class RoleStore {
  constructor() {
    makeAutoObservable(this)
  }

  openYourEyes(lastJsonMessage: WsJsonMessage): void {
    const answerOptions: string[] = lastJsonMessage.interaction.answer_options || []

    const playerCards: PlayerPositionProperties[] = gameBoardStore.playerCards.map(
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


        const aerial = (lastJsonMessage.interaction.aerial || []).includes(position) || false
        const alien = (lastJsonMessage.interaction.aliens || []).includes(position) || false
        const alienhand = (lastJsonMessage.interaction.alienhand || []).includes(position) || false
        const artifacted = (lastJsonMessage.interaction.artifacted || []).includes(position) || false
        const assassin = (lastJsonMessage.interaction.assassins || []).includes(position) || false
        /* const awesome = (lastJsonMessage.interaction.awesome || []).includes(position) || false */
        /* const bear = (lastJsonMessage.interaction.bear || []).includes(position) || false */
        /* const babyalien = (lastJsonMessage.interaction.babyalien || []).includes(position) || false */
        /* const blind = (lastJsonMessage.interaction.blind || []).includes(position) || false */
        const blob = (lastJsonMessage.interaction.blob || []).includes(position) || false
        /* const bulb = (lastJsonMessage.interaction.bulb || []).includes(position) || false */
        const claw = (lastJsonMessage.interaction.claw || []).includes(position) || false
        /* const coffin = (lastJsonMessage.interaction.coffin || []).includes(position) || false */
        const copy = (lastJsonMessage.interaction.copy || []).includes(position) || false
        /* const cow = (lastJsonMessage.interaction.cow || []).includes(position) || false */
        const detector = (lastJsonMessage.interaction.detector || []).includes(position) || false
        const dog = (lastJsonMessage.interaction.dog || []).includes(position) || false
        const dreamwolf = (lastJsonMessage.interaction.dreamwolf || []).includes(position) || false
        /* const dress = (lastJsonMessage.interaction.dress || []).includes(position) || false */
        const drunk = (lastJsonMessage.interaction.drunk || []).includes(position) || false
        /* const empath = (lastJsonMessage.interaction.empath || []).includes(position) || false */
        /* const evil = (lastJsonMessage.interaction.evil || []).includes(position) || false */
        const evilhand = (lastJsonMessage.interaction.evilhand || []).includes(position) || false
        const family = (lastJsonMessage.interaction.family || []).includes(position) || false
        /* const friend = (lastJsonMessage.interaction.friend || []).includes(position) || false */
        const gremlin = (lastJsonMessage.interaction.gremlin || []).includes(position) || false
        const groobzerb = (lastJsonMessage.interaction.groobzerb || []).includes(position) || false
        const idcard = (lastJsonMessage.interaction.idcard || []).includes(position) || false
        const interaction = (lastJsonMessage.interaction.interaction || []).includes(position) || false
        const investigator = (lastJsonMessage.interaction.investigator || []).includes(position) || false
        /* const like = (lastJsonMessage.interaction.like || []).includes(position) || false */
        const lover = (lastJsonMessage.interaction.lovers || []).includes(position) || false
        const mad = (lastJsonMessage.interaction.mad || []).includes(position) || false
        const mason = (lastJsonMessage.interaction.masons || []).includes(position) || false
        const mortician = (lastJsonMessage.interaction.mortician || []).includes(position) || false
        /* const mute = (lastJsonMessage.interaction.mute || []).includes(position) || false */
        const mystic = (lastJsonMessage.interaction.mystic || []).includes(position) || false
        /* const nice = (lastJsonMessage.interaction.nice || []).includes(position) || false */
        const nostradamus = (lastJsonMessage.interaction.nostradamus || []).includes(position) || false
        /* const oracle = (lastJsonMessage.interaction.oracle || []).includes(position) || false */
        const peeker = (lastJsonMessage.interaction.peeker || []).includes(position) || false
        const prank = (lastJsonMessage.interaction.prank || []).includes(position) || false
        /* const pretty = (lastJsonMessage.interaction.pretty || []).includes(position) || false */
        const robber = (lastJsonMessage.interaction.robber || []).includes(position) || false
        const seer = (lastJsonMessage.interaction.seers || []).includes(position) || false
        /* const select = (lastJsonMessage.interaction.select || []).includes(position) || false */
        const sentinel = (lastJsonMessage.interaction.sentinel || []).includes(position) || false
        /* const smell = (lastJsonMessage.interaction.smell || []).includes(position) || false */
        /* const spy = (lastJsonMessage.interaction.spy || []).includes(position) || false */
        /* const sus = (lastJsonMessage.interaction.sus || []).includes(position) || false */
        const swap = (lastJsonMessage.interaction.swap || []).includes(position) || false
        const tanner = (lastJsonMessage.interaction.tanner || []).includes(position) || false
        const tap = (lastJsonMessage.interaction.tap || []).includes(position) || false
        /* const think = (lastJsonMessage.interaction.think || []).includes(position) || false */
        const thumb = (lastJsonMessage.interaction.thumb || []).includes(position) || false
        /* const trophy = (lastJsonMessage.interaction.trophy || []).includes(position) || false */
        const ufo = (lastJsonMessage.interaction.ufo || []).includes(position) || false
        const vampire = (lastJsonMessage.interaction.vampires || []).includes(position) || false
        const villain = (lastJsonMessage.interaction.villains || []).includes(position) || false
        const voodoo = (lastJsonMessage.interaction.voodoo || []).includes(position) || false
        const werewolf = (lastJsonMessage.interaction.werewolves || []).includes(position) || false
        const witch = (lastJsonMessage.interaction.witch || []).includes(position) || false

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
          target,

          aerial,
          alien,
          alienhand,
          artifacted,
          assassin,
          /* awesome, */
          /* bear, */
          /* babyalien, */
          /* blind, */
          blob,
          /* bulb, */
          claw,
          /* coffin, */
          copy,
          /* cow, */
          detector,
          dog,
          dreamwolf,
          /* dress, */
          drunk,
          /* empath, */
          /* evil, */
          evilhand,
          family,
          /* friend, */
          gremlin,
          groobzerb,
          idcard,
          interaction,
          investigator,
          /* like, */
          lover,
          mad,
          mason,
          mortician,
          /* mute, */
          mystic,
          /* nice, */
          /* night, */
          nostradamus,
          /* oracle, */
          peeker,
          prank,
          /* pretty, */
          robber,
          seer,
          /* select, */
          sentinel,
          /* smell, */
          /* spy, */
          /* sus, */
          swap,
          tanner,
          tap,
          /* think, */
          thumb,
          /* trophy, */
          ufo,
          vampire,
          villain,
          voodoo,
          werewolf,
          witch,
        }
      }
    )

    const centerCards: CenterPositionProperties[]  = gameBoardStore.centerCards.map(
      (centerCard) => {
        const { position } = centerCard

        const selectable_cards = (lastJsonMessage.interaction.selectable_cards || []).includes(position) || false

        const alienhand = (lastJsonMessage.interaction.alienhand || []).includes(position) || false
        const copy = (lastJsonMessage.interaction.copy || []).includes(position) || false
        const drunk = (lastJsonMessage.interaction.drunk || []).includes(position) || false
        const idcard = (lastJsonMessage.interaction.idcard || []).includes(position) || false
        const lonely = (lastJsonMessage.interaction.lonely || []).includes(position) || false
        const prank = (lastJsonMessage.interaction.prank || []).includes(position) || false
        const seer = (lastJsonMessage.interaction.seers || []).includes(position) || false
        const swap = (lastJsonMessage.interaction.swap || []).includes(position) || false
        const voodoo = (lastJsonMessage.interaction.voodoo || []).includes(position) || false
        const witch = (lastJsonMessage.interaction.witch || []).includes(position) || false

        const showCard = (lastJsonMessage.interaction.show_cards || []).find((showCardObj) => Object.keys(showCardObj)[0] === position)
        const cardId = showCard ? showCard[position] : centerCard.id

        return { 
          ...centerCard, 
          cardId, 
          selectable_cards,
 
          alienhand,
          copy,
          drunk,
          idcard,
          lonely,
          prank,
          seer,
          swap,
          voodoo,
          witch,
        }
      }
    )

    interactionStore.selectableCenterCardLimit = lastJsonMessage.interaction.selectable_card_limit?.center
    interactionStore.selectablePlayerCardLimit = lastJsonMessage.interaction.selectable_card_limit?.player
    interactionStore.selectableMarkLimit = lastJsonMessage.interaction.selectable_mark_limit?.mark
    gameBoardStore.setAnswerOptions(answerOptions)
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
      player_mark: lastJsonMessage.interaction?.player_mark,
    })
  }
}

export default RoleStore
export const roleStore = new RoleStore()
