import { ALL_ALIEN, ALL_COPY_PLAYER, ALL_SUPER_VILLAIN, ALL_VAMPIRE, ALL_WEREWOLF, COPY_PLAYER, GROOB_AND_ZERB, MASONS } from '../constants'
import { logTrace } from '../log'

const isRoleOrCopyPlayer = (card, roleIdArray) => {
  return roleIdArray.some(id => card.player_role_id === id && [id, ...ALL_COPY_PLAYER].includes(card.player_original_id))
}

const isSpecificRole = (card, roleId) => {
  logTrace(`isSpecificRole: im here with ${roleId}`)
  logTrace(`isSpecificRole: im here with ${card.player_original_id === roleId}`)
  logTrace(`isSpecificRole: im here with ${card.player_role_id === roleId && COPY_PLAYER.includes(card.player_original_id)}`)
  return card.player_original_id === roleId || (card.player_role_id === roleId && COPY_PLAYER.includes(card.player_original_id))
}

const isCopyPlayerRole = (card, roleId) => {
  return card.player_role_id === roleId && card.player_original_id === 1
}

export const isActivePlayer = card => {
  return {
    ALIENS: isRoleOrCopyPlayer(card, ALL_ALIEN),
    ALIENS_VOTE: isRoleOrCopyPlayer(card, ALL_ALIEN),
    ALPHA_WOLF: isRoleOrCopyPlayer(card, ALL_ALIEN),
    ANNOYING_LAD: isSpecificRole(card, 55),
    APPRENTICE_ASSASSIN: isSpecificRole(card, 28),
    APPRENTICE_SEER: isSpecificRole(card, 18),
    APPRENTICE_TANNER: isSpecificRole(card, 71),
    ASSASSIN: isSpecificRole(card, 29),
    AURA_SEER: isSpecificRole(card, 72),
    BEHOLDER: isSpecificRole(card, 73),
    BLOB: isSpecificRole(card, 44),
    BODY_SNATCHER: isSpecificRole(card, 74),
    COPYCAT: card.player_original_id === 30,
    COW: isSpecificRole(card, 45),
    CUPID: isSpecificRole(card, 31),
    CURATOR: isSpecificRole(card, 20),
    DETECTOR: isSpecificRole(card, 56),
    DISEASED: isSpecificRole(card, 32),
    DOPPELGÄNGER: card.player_original_id === 1,

    // DOPPELGÄNGER roles
    DOPPELGÄNGER_APPRENTICE_ASSASSIN: isCopyPlayerRole(card, 28),
    DOPPELGÄNGER_ASSASSIN: isCopyPlayerRole(card, 29),
    DOPPELGÄNGER_BODY_SNATCHER: isCopyPlayerRole(card, 74),
    DOPPELGÄNGER_CURATOR: isCopyPlayerRole(card, 20),
    DOPPELGÄNGER_EMPATH: isCopyPlayerRole(card, 20),
    DOPPELGÄNGER_EMPATH_VOTE: isCopyPlayerRole(card, 77),
    DOPPELGÄNGER_EXPOSER: isCopyPlayerRole(card, 46),
    DOPPELGÄNGER_FLIPPER: isCopyPlayerRole(card, 59),
    DOPPELGÄNGER_GREMLIN: isCopyPlayerRole(card, 33),
    DOPPELGÄNGER_INSTANT_ACTION: card.player_original_id === 1,
    DOPPELGÄNGER_MORTICIAN: isCopyPlayerRole(card, 49),
    DOPPELGÄNGER_PICKPOCKET: isCopyPlayerRole(card, 36),
    DOPPELGÄNGER_PRIEST: isCopyPlayerRole(card, 37),
    DOPPELGÄNGER_PSYCHIC: isCopyPlayerRole(card, 51),
    DOPPELGÄNGER_RASCAL: isCopyPlayerRole(card, 52),
    DOPPELGÄNGER_REVEALER: isCopyPlayerRole(card, 24),
    DOPPELGÄNGER_THE_COUNT: isCopyPlayerRole(card, 39),

    DR_PEEKER: isSpecificRole(card, 57),
    DRUNK: isSpecificRole(card, 2),
    EMPATH: card.player_original_id !== 77 || (card.player_role_id !== 20 && COPY_PLAYER.includes(card.player_original_id)),
    EMPATH_VOTE: isSpecificRole(card, 77),
    EVILOMETER: isSpecificRole(card, 58),
    EXPOSER: isSpecificRole(card, 46),
    FAMILY_MAN: isSpecificRole(card, 78),
    FLIPPER: isSpecificRole(card, 59),
    GREMLIN: isSpecificRole(card, 33),
    GROOB_ZERB: isRoleOrCopyPlayer(card, GROOB_AND_ZERB),
    INSOMNIAC: isSpecificRole(card, 4),
    INSTIGATOR: isSpecificRole(card, 34),
    INTERN: isSpecificRole(card, 62),
    LEADER: isSpecificRole(card, 48),
    LEADER_ZERB_GROOB: isSpecificRole(card, 48),
    LOVERS: card.player_mark === 'mark_of_love',
    MARKSMAN: isSpecificRole(card, 35),
    MASONS: isRoleOrCopyPlayer(card, MASONS),
    MINION: isSpecificRole(card, 7),
    MIRROR_MAN: card.player_original_id === 64,
    MORTICIAN: isSpecificRole(card, 49),
    MYSTIC_WOLF: isSpecificRole(card, 22),
    NOSTRADAMUS: isSpecificRole(card, 80),
    ORACLE_ANSWER: card.player_original_id === 50,
    ORACLE_QUESTION: card.player_original_id === 50,
    PARANORMAL_INVESTIGATOR: isSpecificRole(card, 23),
    PICKPOCKET: isSpecificRole(card, 36),
    PRIEST: isSpecificRole(card, 37),
    PSYCHIC: isSpecificRole(card, 51),
    RAPSCALLION: isSpecificRole(card, 65),
    RASCAL: isSpecificRole(card, 52),
    RENFIELD: isSpecificRole(card, 38),
    REVEALER: isSpecificRole(card, 24),
    ROBBER: isSpecificRole(card, 8),
    ROLE_RETRIEVER: isSpecificRole(card, 66),
    SEER: isSpecificRole(card, 9),
    SELF_AWARENESS_GIRL: isSpecificRole(card, 67),
    SENTINEL: isSpecificRole(card, 25),
    SQUIRE: isSpecificRole(card, 83),
    SUPER_VILLAINS: isRoleOrCopyPlayer(card, ALL_SUPER_VILLAIN),
    SWITCHEROO: isSpecificRole(card, 68),
    TEMPTRESS: isSpecificRole(card, 69),
    THE_COUNT: isSpecificRole(card, 39),
    THING: isSpecificRole(card, 85),
    TROUBLEMAKER: isSpecificRole(card, 11),
    VAMPIRES: isRoleOrCopyPlayer(card, ALL_VAMPIRE),
    VAMPIRES_VOTE: isRoleOrCopyPlayer(card, ALL_VAMPIRE),
    VILLAGE_IDIOT: isSpecificRole(card, 26),
    VOODOO_LOU: isSpecificRole(card, 70),
    WEREWOLVES: isRoleOrCopyPlayer(card, ALL_WEREWOLF),
    WITCH: isSpecificRole(card, 27)
  }
}
