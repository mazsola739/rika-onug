import { ALIEN_IDS, ALL_COPY_PLAYER, SUPER_VILLAIN_IDS, VAMPIRE_IDS, WEREVOLVES_WITHOUT_DREAMWOLF, COPY_PLAYER, GROOB_AND_ZERB, MASONS } from '../constants'

const isEveryOne = true //TODO better solution?
//TODO eyes open
const isWitness = card => card.eyes_open

const isRolePlayersOrAllCopyPlayers = (card, roleIdArray) => {
  return roleIdArray.some(id => card.player_role_id === id && [id, ...ALL_COPY_PLAYER].includes(card.player_original_id))
}

const IsRolePlayerOrCopyRolePlayer = (card, roleId) => {
  return card.player_original_id === roleId || (card.player_role_id === roleId && COPY_PLAYER.includes(card.player_original_id))
}

const IsRolePlayerOrAllCopyRolePlayer = (card, roleId) => {
  return card.player_original_id === roleId || (card.player_role_id === roleId && ALL_COPY_PLAYER.includes(card.player_original_id))
}

const isDoppelgangerRolePlayer = (card, roleId) => {
  return card.player_role_id === roleId && card.player_original_id === 1
}

const isLovers = card => {
  return card.player_mark === 'mark_of_love'
}

export const isActivePlayer = card => {
  return {
    ALIENS: isRolePlayersOrAllCopyPlayers(card, ALIEN_IDS),
    ALPHA_WOLF: IsRolePlayerOrCopyRolePlayer(card, 17),
    ANNOYING_LAD: IsRolePlayerOrAllCopyRolePlayer(card, 55),
    APPRENTICE_ASSASSIN: IsRolePlayerOrCopyRolePlayer(card, 28),
    APPRENTICE_SEER: IsRolePlayerOrAllCopyRolePlayer(card, 18),
    APPRENTICE_TANNER: IsRolePlayerOrAllCopyRolePlayer(card, 71),
    ASSASSIN: IsRolePlayerOrCopyRolePlayer(card, 29),
    AURA_SEER: IsRolePlayerOrAllCopyRolePlayer(card, 72),
    BEHOLDER: IsRolePlayerOrAllCopyRolePlayer(card, 73),
    BLOB: IsRolePlayerOrAllCopyRolePlayer(card, 44),
    BODY_SNATCHER: IsRolePlayerOrCopyRolePlayer(card, 74),
    COPYCAT: card.player_original_id === 30,
    COW: IsRolePlayerOrAllCopyRolePlayer(card, 45),
    CUPID: IsRolePlayerOrCopyRolePlayer(card, 31),
    CURATOR: IsRolePlayerOrCopyRolePlayer(card, 20),
    DETECTOR: IsRolePlayerOrAllCopyRolePlayer(card, 56),
    DISEASED: IsRolePlayerOrCopyRolePlayer(card, 32),
    DOPPELGANGER: card.player_original_id === 1,
    DOPPELGANGER_APPRENTICE_ASSASSIN: isDoppelgangerRolePlayer(card, 28),
    DOPPELGANGER_ASSASSIN: isDoppelgangerRolePlayer(card, 29),
    DOPPELGANGER_BODY_SNATCHER: isDoppelgangerRolePlayer(card, 74),
    DOPPELGANGER_CURATOR: isDoppelgangerRolePlayer(card, 20),
    DOPPELGANGER_EMPATH: isDoppelgangerRolePlayer(card, 77),
    DOPPELGANGER_EXPOSER: isDoppelgangerRolePlayer(card, 46),
    DOPPELGANGER_FLIPPER: isDoppelgangerRolePlayer(card, 59),
    DOPPELGANGER_GREMLIN: isDoppelgangerRolePlayer(card, 33),
    DOPPELGANGER_INSTANT_ACTION: card.player_original_id === 1,
    DOPPELGANGER_MORTICIAN: isDoppelgangerRolePlayer(card, 49),
    DOPPELGANGER_PICKPOCKET: isDoppelgangerRolePlayer(card, 36),
    DOPPELGANGER_PRIEST: isDoppelgangerRolePlayer(card, 37),
    DOPPELGANGER_PSYCHIC: isDoppelgangerRolePlayer(card, 51),
    DOPPELGANGER_RASCAL: isDoppelgangerRolePlayer(card, 52),
    DOPPELGANGER_REVEALER: isDoppelgangerRolePlayer(card, 24),
    DOPPELGANGER_THE_COUNT: isDoppelgangerRolePlayer(card, 39),
    DR_PEEKER: IsRolePlayerOrCopyRolePlayer(card, 57),
    DRUNK: IsRolePlayerOrCopyRolePlayer(card, 2),
    EMPATH: IsRolePlayerOrCopyRolePlayer(card, 77),
    EPIC_BATTLE: isEveryOne,
    EVERYONE_MARK: isEveryOne,
    EVILOMETER: IsRolePlayerOrAllCopyRolePlayer(card, 58),
    EXPOSER: IsRolePlayerOrCopyRolePlayer(card, 46),
    FAMILY_MAN: IsRolePlayerOrAllCopyRolePlayer(card, 78),
    FLIPPER: IsRolePlayerOrCopyRolePlayer(card, 59),
    GREMLIN: IsRolePlayerOrCopyRolePlayer(card, 33),
    GROOB_ZERB: isRolePlayersOrAllCopyPlayers(card, GROOB_AND_ZERB),
    INSOMNIAC: IsRolePlayerOrAllCopyRolePlayer(card, 4),
    INSTIGATOR: IsRolePlayerOrCopyRolePlayer(card, 34),
    INTERN: IsRolePlayerOrAllCopyRolePlayer(card, 62),
    JOKE: isEveryOne,
    LEADER: IsRolePlayerOrAllCopyRolePlayer(card, 48),
    LEADER_ZERB_GROOB: IsRolePlayerOrAllCopyRolePlayer(card, 48),
    LOVERS: isLovers(card),
    MARKSMAN: IsRolePlayerOrAllCopyRolePlayer(card, 35),
    MASONS: isRolePlayersOrAllCopyPlayers(card, MASONS),
    MINION: IsRolePlayerOrAllCopyRolePlayer(card, 7),
    MIRROR_MAN: card.player_original_id === 64,
    MORTICIAN: IsRolePlayerOrCopyRolePlayer(card, 49),
    MYSTIC_WOLF: IsRolePlayerOrCopyRolePlayer(card, 22),
    NOSTRADAMUS: IsRolePlayerOrAllCopyRolePlayer(card, 80),
    ORACLE_ANSWER: card.player_original_id === 50,
    ORACLE_QUESTION: card.player_original_id === 50,
    PARANORMAL_INVESTIGATOR: IsRolePlayerOrCopyRolePlayer(card, 23),
    PICKPOCKET: IsRolePlayerOrCopyRolePlayer(card, 36),
    PRIEST: IsRolePlayerOrCopyRolePlayer(card, 37),
    PSYCHIC: IsRolePlayerOrCopyRolePlayer(card, 51),
    RAPSCALLION: IsRolePlayerOrCopyRolePlayer(card, 65),
    RASCAL: IsRolePlayerOrCopyRolePlayer(card, 52),
    RENFIELD: IsRolePlayerOrAllCopyRolePlayer(card, 38),
    REVEALER: IsRolePlayerOrCopyRolePlayer(card, 24),
    RIPPLE: isEveryOne,
    ROBBER: IsRolePlayerOrCopyRolePlayer(card, 8),
    ROLE_RETRIEVER: IsRolePlayerOrAllCopyRolePlayer(card, 66),
    SEER: IsRolePlayerOrCopyRolePlayer(card, 9),
    SELF_AWARENESS_GIRL: IsRolePlayerOrAllCopyRolePlayer(card, 67),
    SENTINEL: IsRolePlayerOrCopyRolePlayer(card, 25),
    SQUIRE: IsRolePlayerOrAllCopyRolePlayer(card, 83),
    SUPER_VILLAINS: isRolePlayersOrAllCopyPlayers(card, SUPER_VILLAIN_IDS),
    SWITCHEROO: IsRolePlayerOrAllCopyRolePlayer(card, 68),
    TEMPTRESS: IsRolePlayerOrCopyRolePlayer(card, 69),
    THE_COUNT: IsRolePlayerOrCopyRolePlayer(card, 39),
    THING: IsRolePlayerOrCopyRolePlayer(card, 85),
    TROUBLEMAKER: IsRolePlayerOrCopyRolePlayer(card, 11),
    VAMPIRES: isRolePlayersOrAllCopyPlayers(card, VAMPIRE_IDS),
    VILLAGE_IDIOT: IsRolePlayerOrCopyRolePlayer(card, 26),
    VOODOO_LOU: IsRolePlayerOrAllCopyRolePlayer(card, 70),
    WEREWOLVES: isRolePlayersOrAllCopyPlayers(card, WEREVOLVES_WITHOUT_DREAMWOLF),
    WITCH: IsRolePlayerOrCopyRolePlayer(card, 27),
    WITNESS: isWitness(card)
  }
}

/* TODO DO I NEED
export const thisPlayerActive = player => {
  return {
    PLAYER_1: player.player_number === 'player_1',
    PLAYER_2: player.player_number === 'player_2',
    PLAYER_3: player.player_number === 'player_3',
    PLAYER_4: player.player_number === 'player_4',
    PLAYER_5: player.player_number === 'player_5',
    PLAYER_6: player.player_number === 'player_6',
    PLAYER_7: player.player_number === 'player_7',
    PLAYER_8: player.player_number === 'player_8',
    PLAYER_9: player.player_number === 'player_9',
    PLAYER_10: player.player_number === 'player_10',
    PLAYER_11: player.player_number === 'player_11',
    PLAYER_12: player.player_number === 'player_12'
  }
} */
