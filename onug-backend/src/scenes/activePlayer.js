import { ALL_ALIEN, ALL_COPY_PLAYER, ALL_SUPER_VILLAIN, ALL_VAMPIRE, ALL_WEREWOLF, COPY_PLAYER, GROOB_AND_ZERB, MASONS } from '../constants'

const isEveryOne = true
//TODO oracle
/* const isOracleEyesOpen = (card) => card.player_original_id === 50  && card.oracle_eyes_open */

const isRoleOrCopyPlayer = (card, roleIdArray) => {
  return roleIdArray.some(id => card.player_role_id === id && [id, ...ALL_COPY_PLAYER].includes(card.player_original_id))
}

const isSpecificRole = (card, roleId) => {
  return card.player_original_id === roleId || (card.player_role_id === roleId && COPY_PLAYER.includes(card.player_original_id))
}

const isCopyPlayerRole = (card, roleId) => {
  return card.player_role_id === roleId && card.player_original_id === 1
}

const isLovers = card => {
  return card.player_mark === 'mark_of_love'
}

export const isActivePlayer = card => {
/*   const oracle = isOracleEyesOpen(card) */
  return {
    ALIENS: /* oracle ||  */isRoleOrCopyPlayer(card, ALL_ALIEN),
    ALPHA_WOLF: /* oracle ||  */isSpecificRole(card, 17),
    ANNOYING_LAD: /* oracle ||  */isSpecificRole(card, 55),
    APPRENTICE_ASSASSIN: /* oracle ||  */isSpecificRole(card, 28),
    APPRENTICE_SEER: /* oracle ||  */isSpecificRole(card, 18),
    APPRENTICE_TANNER: /* oracle ||  */isSpecificRole(card, 71),
    ASSASSIN: /* oracle ||  */isSpecificRole(card, 29),
    AURA_SEER: /* oracle ||  */isSpecificRole(card, 72),
    BEHOLDER: /* oracle ||  */isSpecificRole(card, 73),
    BLOB: /* oracle ||  */isSpecificRole(card, 44),
    BODY_SNATCHER: /* oracle ||  */isSpecificRole(card, 74),
    COPYCAT: /* oracle ||  */card.player_original_id === 30,
    COW: /* oracle ||  */isSpecificRole(card, 45),
    CUPID: /* oracle ||  */isSpecificRole(card, 31),
    CURATOR: /* oracle ||  */isSpecificRole(card, 20),
    DETECTOR: /* oracle ||  */isSpecificRole(card, 56),
    DISEASED: /* oracle ||  */isSpecificRole(card, 32),
    DOPPELGÄNGER: /* oracle ||  */card.player_original_id === 1,
    DOPPELGÄNGER_APPRENTICE_ASSASSIN: /* oracle ||  */isCopyPlayerRole(card, 28),
    DOPPELGÄNGER_ASSASSIN: /* oracle ||  */isCopyPlayerRole(card, 29),
    DOPPELGÄNGER_BODY_SNATCHER: /* oracle ||  */isCopyPlayerRole(card, 74),
    DOPPELGÄNGER_CURATOR: /* oracle ||  */isCopyPlayerRole(card, 20),
    DOPPELGÄNGER_EMPATH: /* oracle ||  */isCopyPlayerRole(card, 20),
    DOPPELGÄNGER_EXPOSER: /* oracle ||  */isCopyPlayerRole(card, 46),
    DOPPELGÄNGER_FLIPPER: /* oracle ||  */isCopyPlayerRole(card, 59),
    DOPPELGÄNGER_GREMLIN: /* oracle ||  */isCopyPlayerRole(card, 33),
    DOPPELGÄNGER_INSTANT_ACTION: /* oracle ||  */card.player_original_id === 1,
    DOPPELGÄNGER_MORTICIAN: /* oracle ||  */isCopyPlayerRole(card, 49),
    DOPPELGÄNGER_PICKPOCKET: /* oracle ||  */isCopyPlayerRole(card, 36),
    DOPPELGÄNGER_PRIEST: /* oracle ||  */isCopyPlayerRole(card, 37),
    DOPPELGÄNGER_PSYCHIC: /* oracle ||  */isCopyPlayerRole(card, 51),
    DOPPELGÄNGER_RASCAL: /* oracle ||  */isCopyPlayerRole(card, 52),
    DOPPELGÄNGER_REVEALER: /* oracle ||  */isCopyPlayerRole(card, 24),
    DOPPELGÄNGER_THE_COUNT: /* oracle ||  */isCopyPlayerRole(card, 39),
    DR_PEEKER: /* oracle ||  */isSpecificRole(card, 57),
    DRUNK: /* oracle ||  */isSpecificRole(card, 2),
    EMPATH: /* oracle ||  */card.player_original_id !== 77 || (card.player_role_id !== 20 && COPY_PLAYER.includes(card.player_original_id)),
    EPIC_BATTLE: isEveryOne,
    EVERYONE_MARK: isEveryOne,
    EVILOMETER: /* oracle ||  */isSpecificRole(card, 58),
    EXPOSER: /* oracle ||  */isSpecificRole(card, 46),
    FAMILY_MAN: /* oracle ||  */isSpecificRole(card, 78),
    FLIPPER: /* oracle ||  */isSpecificRole(card, 59),
    GREMLIN: /* oracle ||  */isSpecificRole(card, 33),
    GROOB_ZERB: /* oracle ||  */isRoleOrCopyPlayer(card, GROOB_AND_ZERB),
    INSOMNIAC: /* oracle ||  */isSpecificRole(card, 4),
    INSTIGATOR: /* oracle ||  */isSpecificRole(card, 34),
    INTERN: /* oracle ||  */isSpecificRole(card, 62),
    JOKE: isEveryOne,
    LEADER: /* oracle ||  */isSpecificRole(card, 48),
    LEADER_ZERB_GROOB: /* oracle ||  */isSpecificRole(card, 48),
    LOVERS: /* oracle ||  */isLovers(card),
    MARKSMAN: /* oracle ||  */isSpecificRole(card, 35),
    MASONS: /* oracle ||  */isRoleOrCopyPlayer(card, MASONS),
    MINION: /* oracle ||  */isSpecificRole(card, 7),
    MIRROR_MAN: /* oracle ||  */card.player_original_id === 64,
    MORTICIAN: /* oracle ||  */isSpecificRole(card, 49),
    MYSTIC_WOLF: /* oracle ||  */isSpecificRole(card, 22),
    NOSTRADAMUS: /* oracle ||  */isSpecificRole(card, 80),
    ORACLE_ANSWER: card.player_original_id === 50,
    ORACLE_QUESTION: card.player_original_id === 50,
    PARANORMAL_INVESTIGATOR: /* oracle ||  */isSpecificRole(card, 23),
    PICKPOCKET: /* oracle ||  */isSpecificRole(card, 36),
    PRIEST: /* oracle ||  */isSpecificRole(card, 37),
    PSYCHIC: /* oracle ||  */isSpecificRole(card, 51),
    RAPSCALLION: /* oracle ||  */isSpecificRole(card, 65),
    RASCAL: /* oracle ||  */isSpecificRole(card, 52),
    RENFIELD: /* oracle ||  */isSpecificRole(card, 38),
    REVEALER: /* oracle ||  */isSpecificRole(card, 24),
    ROBBER: /* oracle ||  */isSpecificRole(card, 8),
    ROLE_RETRIEVER: /* oracle ||  */isSpecificRole(card, 66),
    SEER: /* oracle ||  */isSpecificRole(card, 9),
    SELF_AWARENESS_GIRL: /* oracle ||  */isSpecificRole(card, 67),
    SENTINEL: /* oracle ||  */isSpecificRole(card, 25),
    SQUIRE: /* oracle ||  */isSpecificRole(card, 83),
    SUPER_VILLAINS: /* oracle ||  */isRoleOrCopyPlayer(card, ALL_SUPER_VILLAIN),
    SWITCHEROO: /* oracle ||  */isSpecificRole(card, 68),
    TEMPTRESS: /* oracle ||  */isSpecificRole(card, 69),
    THE_COUNT: /* oracle ||  */isSpecificRole(card, 39),
    THING: /* oracle ||  */isSpecificRole(card, 85),
    TROUBLEMAKER: /* oracle ||  */isSpecificRole(card, 11),
    VAMPIRES: /* oracle ||  */isRoleOrCopyPlayer(card, ALL_VAMPIRE),
    VILLAGE_IDIOT: /* oracle ||  */isSpecificRole(card, 26),
    VOODOO_LOU: /* oracle ||  */isSpecificRole(card, 70),
    WEREWOLVES: /* oracle ||  */isRoleOrCopyPlayer(card, ALL_WEREWOLF),
    WITCH: /* oracle ||  */isSpecificRole(card, 27)
  }
}
