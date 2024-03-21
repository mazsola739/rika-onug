import { DOPPELGANGER_INSTANT_ACTION_IDS } from 'constant'
import { OrderType } from 'types'

export const order: OrderType[] = [
  {
    scene_title: 'ORACLE_QUESTION',
    card_id: [50],
    scene_number: 2,
  },
  {
    scene_title: 'ORACLE_ANSWER',
    card_id: [50],
    scene_number: 3,
  },
  {
    scene_title: 'COPYCAT',
    card_id: [30],
    scene_number: 4,
  },
  {
    scene_title: 'MIRROR_MAN',
    card_id: [64],
    scene_number: 5,
  },
  {
    scene_title: 'DOPPELGÄNGER',
    card_id: [1],
    scene_number: 6,
  },
  {
    scene_title: 'DOPPELGÄNGER_INSTANT_ACTION',
    card_id: [1],
    scene_number: 7,
    condition: (selectedCards) => selectedCards.some(card => DOPPELGANGER_INSTANT_ACTION_IDS.includes(card.id)),
  },
  {
    scene_title: 'VAMPIRES',
    card_id: [39, 40, 41, 1],
    scene_number: 8,
    condition: (selectedCards) =>
      selectedCards.some((card) => card.id === 39) ||
      selectedCards.some((card) => card.id === 40) ||
      selectedCards.some((card) => card.id === 41),
  },
  {
    scene_title: 'THE_COUNT',
    card_id: [39],
    scene_number: 9,
  },
  {
    scene_title: 'DOPPELGÄNGER_THE_COUNT',
    card_id: [1],
    scene_number: 10,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 39),
  },
  {
    scene_title: 'RENFIELD',
    card_id: [38, 1],
    scene_number: 11,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 38),
  },
  {
    scene_title: 'DISEASED',
    card_id: [32],
    scene_number: 12,
  },
  {
    scene_title: 'CUPID',
    card_id: [31],
    scene_number: 13,
  },
  {
    scene_title: 'INSTIGATOR',
    card_id: [34],
    scene_number: 14,
  },
  {
    scene_title: 'PRIEST',
    card_id: [37],
    scene_number: 15,
  },
  {
    scene_title: 'DOPPELGÄNGER_PRIEST',
    card_id: [1],
    scene_number: 16,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 37),
  },
  {
    scene_title: 'ASSASSIN',
    card_id: [29],
    scene_number: 17,
  },
  {
    scene_title: 'DOPPELGÄNGER_ASSASSIN',
    card_id: [1],
    scene_number: 18,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 29),
  },
  {
    scene_title: 'APPRENTICE_ASSASSIN',
    card_id: [28],
    scene_number: 19,
  },
  {
    scene_title: 'DOPPELGÄNGER_APPRENTICE_ASSASSIN',
    card_id: [1],
    scene_number: 20,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 28),
  },
  {
    scene_title: 'SENTINEL',
    card_id: [25],
    scene_number: 23,
  },
  {
    scene_title: 'ALIENS',
    card_id: [42, 43, 47, 53, 54, 74, 1],
    scene_number: 24,
    condition: (selectedCards) =>
      selectedCards.some((card) => card.id === 42) ||
      selectedCards.some((card) => card.id === 43) ||
      selectedCards.some((card) => card.id === 47) ||
      selectedCards.some((card) => card.id === 53) ||
      selectedCards.some((card) => card.id === 54) ||
      selectedCards.some((card) => card.id === 74),
  },
  {
    scene_title: 'COW',
    card_id: [45, 1],
    scene_number: 25,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 45),
  },
  {
    scene_title: 'GROOB_ZERB',
    card_id: [47, 54, 1],
    scene_number: 26,
    condition: (selectedCards) =>
      selectedCards.some((card) => card.id === 47) &&
      selectedCards.some((card) => card.id === 54),
  },
  {
    scene_title: 'LEADER',
    card_id: [48, 1],
    scene_number: 27,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 48),
  },
  {
    scene_title: 'LEADER_ZERB_GROOB',
    card_id: [48, 1],
    scene_number: 28,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 28),
  },
  {
    scene_title: 'BODY_SNATCHER',
    card_id: [74],
    scene_number: 29,
  },
  {
    scene_title: 'DOPPELGÄNGER_BODY_SNATCHER',
    card_id: [1],
    scene_number: 30,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 74),
  },
  {
    scene_title: 'SUPER_VILLAINS',
    card_id: [57, 60, 65, 69, 1],
    scene_number: 31,
    condition: (selectedCards) =>
      selectedCards.some((card) => card.id === 57) ||
      selectedCards.some((card) => card.id === 60) ||
      selectedCards.some((card) => card.id === 65) ||
      selectedCards.some((card) => card.id === 69),
  },
  {
    scene_title: 'TEMPTRESS',
    card_id: [69],
    scene_number: 32,
  },
  {
    scene_title: 'DR_PEEKER',
    card_id: [57],
    scene_number: 33,
  },
  {
    scene_title: 'RAPSCALLION',
    card_id: [65],
    scene_number: 34,
  },
  {
    scene_title: 'EVILOMETER',
    card_id: [58, 1],
    scene_number: 35,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 58),
  },
  {
    scene_title: 'WEREWOLVES',
    card_id: [15, 16, 17, 21, 22, 1],
    scene_number: 36,
    condition: (selectedCards) =>
      selectedCards.some((card) => card.id === 15) ||
      selectedCards.some((card) => card.id === 16) ||
      selectedCards.some((card) => card.id === 17) ||
      selectedCards.some((card) => card.id === 22),
  },
  {
    scene_title: 'ALPHA_WOLF',
    card_id: [17],
    scene_number: 37,
  },
  {
    scene_title: 'MYSTIC_WOLF',
    card_id: [22],
    scene_number: 38,
  },
  {
    scene_title: 'MINION',
    card_id: [7, 1],
    scene_number: 39,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 7),
  },
  {
    scene_title: 'APPRENTICE_TANNER',
    card_id: [71, 1],
    scene_number: 40,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 71),
  },
  {
    scene_title: 'MAD_SCIENTIST',
    card_id: [63, 1],
    scene_number: 41,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 63),
  },
  {
    scene_title: 'INTERN',
    card_id: [62, 1],
    scene_number: 42,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 62),
  },
  {
    scene_title: 'MASONS',
    card_id: [5, 6, 1],
    scene_number: 43,
    condition: (selectedCards) =>
      (selectedCards.some((card) => card.id === 5) &&
        selectedCards.some((card) => card.id === 6)) ||
      ((selectedCards.some((card) => card.id === 5) ||
        selectedCards.some((card) => card.id === 6)) &&
        selectedCards.some((card) => card.id === 1)),
  },
  {
    scene_title: 'THING',
    card_id: [85],
    scene_number: 44,
  },
  {
    scene_title: 'ANNOYING_LAD',
    card_id: [55],
    scene_number: 45,
  },
  {
    scene_title: 'SEER',
    card_id: [9],
    scene_number: 46,
  },
  {
    scene_title: 'APPRENTICE_SEER',
    card_id: [18],
    scene_number: 47,
  },
  {
    scene_title: 'PARANORMAL_INVESTIGATOR',
    card_id: [23],
    scene_number: 48,
  },
  {
    scene_title: 'MARKSMAN',
    card_id: [35, 1],
    scene_number: 49,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 35),
  },
  {
    scene_title: 'NOSTRADAMUS',
    card_id: [80],
    scene_number: 50,
  },
  {
    scene_title: 'NOSTRADAMUS_REACTION',
    card_id: [80, 1],
    scene_number: 51,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 80),
  },
  {
    scene_title: 'PSYCHIC',
    card_id: [51],
    scene_number: 52,
  },
  {
    scene_title: 'DOPPELGÄNGER_PSYCHIC',
    card_id: [1],
    scene_number: 53,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 51),
  },
  {
    scene_title: 'DETECTOR',
    card_id: [56],
    scene_number: 54,
  },
  {
    scene_title: 'ROBBER',
    card_id: [8],
    scene_number: 55,
  },
  {
    scene_title: 'WITCH',
    card_id: [27],
    scene_number: 56,
  },
  {
    scene_title: 'PICKPOCKET',
    card_id: [36],
    scene_number: 57,
  },
  {
    scene_title: 'DOPPELGÄNGER_PICKPOCKET',
    card_id: [1],
    scene_number: 58,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 36),
  },
  {
    scene_title: 'ROLE_RETRIEVER',
    card_id: [66],
    scene_number: 59,
  },
  {
    scene_title: 'VOODOO_LOU',
    card_id: [70],
    scene_number: 60,
  },
  {
    scene_title: 'TROUBLEMAKER',
    card_id: [11],
    scene_number: 61,
  },
  {
    scene_title: 'VILLAGE_IDIOT',
    card_id: [26],
    scene_number: 62,
  },
  {
    scene_title: 'AURA_SEER',
    card_id: [72, 1],
    scene_number: 63,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 72),
  },
  {
    scene_title: 'GREMLIN',
    card_id: [33],
    scene_number: 64,
  },
  {
    scene_title: 'DOPPELGÄNGER_GREMLIN',
    card_id: [1],
    scene_number: 65,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 33),
  },
  {
    scene_title: 'RASCAL',
    card_id: [52],
    scene_number: 66,
  },
  {
    scene_title: 'DOPPELGÄNGER_RASCAL',
    card_id: [1],
    scene_number: 67,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 52),
  },
  {
    scene_title: 'SWITCHEROO',
    card_id: [68],
    scene_number: 68,
  },
  {
    scene_title: 'DRUNK',
    card_id: [2],
    scene_number: 69,
  },
  {
    scene_title: 'INSOMNIAC',
    card_id: [4, 1],
    scene_number: 70,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 4),
  },
  {
    scene_title: 'SELF_AWARENESS_GIRL',
    card_id: [67, 1],
    scene_number: 71,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 67),
  },
  {
    scene_title: 'SQUIRE',
    card_id: [83, 1],
    scene_number: 72,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 83),
  },
  {
    scene_title: 'BEHOLDER',
    card_id: [73],
    scene_number: 73,
  },
  {
    scene_title: 'REVEALER',
    card_id: [24],
    scene_number: 74,
  },
  {
    scene_title: 'DOPPELGÄNGER_REVEALER',
    card_id: [1],
    scene_number: 75,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 24),
  },
  {
    scene_title: 'EXPOSER',
    card_id: [46],
    scene_number: 76,
  },
  {
    scene_title: 'DOPPELGÄNGER_EXPOSER',
    card_id: [1],
    scene_number: 77,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 46),
  },
  {
    scene_title: 'FLIPPER',
    card_id: [59],
    scene_number: 78,
  },
  {
    scene_title: 'DOPPELGÄNGER_FLIPPER',
    card_id: [1],
    scene_number: 79,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 59),
  },
  {
    scene_title: 'EMPATH',
    card_id: [77],
    scene_number: 80,
  },
  {
    scene_title: 'DOPPELGÄNGER_EMPATH',
    card_id: [1],
    scene_number: 81,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 77),
  },
  {
    scene_title: 'CURATOR',
    card_id: [20],
    scene_number: 82,
  },
  {
    scene_title: 'DOPPELGÄNGER_CURATOR',
    card_id: [1],
    scene_number: 83,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 20),
  },
  {
    scene_title: 'BLOB',
    card_id: [44, 1],
    scene_number: 84,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 44),
  },
  {
    scene_title: 'MORTICIAN',
    card_id: [49],
    scene_number: 85,
  },
  {
    scene_title: 'DOPPELGÄNGER_MORTICIAN',
    card_id: [1],
    scene_number: 86,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 49),
  },
  {
    scene_title: 'FAMILY_MAN',
    card_id: [78, 1],
    scene_number: 87,
    condition: (selectedCards) => selectedCards.some((card) => card.id === 78),
  },
]
