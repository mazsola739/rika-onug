import { CENTER_CARD_POSITIONS } from '../../../constants'
import { generateRoleInteraction } from '../../sceneUtils'
import { getDreamWolfPlayerNumberByRoleIds, getWerewolfPlayerNumbersByRoleIds } from './werewolves.utils'

export const werewolvesInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const werewolves = getWerewolfPlayerNumbersByRoleIds(newGamestate.players)
  /* // TODO   Uses the Robber or Witch and swaps with a Werewolf or Vampire 
Does not wake up with the Werewolves/Vampires */
  //TODO MARK OF FEAR
  const dreamwolf = getDreamWolfPlayerNumberByRoleIds(newGamestate.players) //TODO fear of mark - cant show here thumb
  const loneWolf = werewolves.length + dreamwolf.length === 1
  const selectable_cards = loneWolf ? CENTER_CARD_POSITIONS : []
  const selectable_card_limit = { player: 0, center: loneWolf ? 1 : 0 }
  const obligatory = loneWolf ? false : true
  const scene_end = loneWolf ? false : true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards,
    selectable_card_limit,
    werewolves,
    dreamwolf,
    obligatory
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: [loneWolf ? 'interaction_may_one_center' : 'interaction_werewolves'],
    selectableCards: { selectable_cards, selectable_card_limit },
    obligatory,
    scene_end,
    uniqueInformations: { werewolves, dreamwolf }
  })
}
