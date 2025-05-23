import { EXPANSION, ROLES, rules_role, TEAM, WAKE } from 'constants'
import { CardJson } from 'types'

export const cards: CardJson[] = [
  {
    id: 1,
    expansion: EXPANSION.werewolf,
    display_name: ROLES.role_doppelganger,
    team: TEAM.village,
    wake_up_time: WAKE.twilight,
    card_name: 'doppelganger',
    rules: rules_role.rules_doppelganger
  },
  {
    id: 2,
    expansion: EXPANSION.werewolf,
    display_name: ROLES.role_drunk,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'drunk',
    rules: rules_role.rules_drunk
  },
  {
    id: 3,
    expansion: EXPANSION.werewolf,
    display_name: ROLES.role_hunter,
    team: TEAM.village,
    wake_up_time: WAKE.day,
    card_name: 'hunter',
    rules: rules_role.rules_hunter
  },
  {
    id: 4,
    expansion: EXPANSION.werewolf,
    display_name: ROLES.role_insomniac,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'insomniac',
    rules: rules_role.rules_insomniac
  },
  {
    id: 5,
    expansion: EXPANSION.werewolf,
    display_name: ROLES.role_mason,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'mason',
    rules: rules_role.rules_mason
  },
  {
    id: 6,
    expansion: EXPANSION.werewolf,
    display_name: ROLES.role_mason,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'mason',
    rules: rules_role.rules_mason
  },
  {
    id: 7,
    expansion: EXPANSION.werewolf,
    display_name: ROLES.role_minion,
    team: TEAM.werewolf,
    wake_up_time: WAKE.night,
    card_name: 'minion',
    rules: rules_role.rules_minion
  },
  {
    id: 8,
    expansion: EXPANSION.werewolf,
    display_name: ROLES.role_robber,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'robber',
    rules: rules_role.rules_robber
  },
  {
    id: 9,
    expansion: EXPANSION.werewolf,
    display_name: ROLES.role_seer,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'seer',
    rules: rules_role.rules_seer
  },
  {
    id: 10,
    expansion: EXPANSION.werewolf,
    display_name: ROLES.role_tanner,
    team: TEAM.own,
    wake_up_time: WAKE.day,
    card_name: 'tanner',
    rules: rules_role.rules_tanner
  },
  {
    id: 11,
    expansion: EXPANSION.werewolf,
    display_name: ROLES.role_troublemaker,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'troublemaker',
    rules: rules_role.rules_troublemaker
  },
  {
    id: 12,
    expansion: EXPANSION.werewolf,
    display_name: ROLES.role_villager,
    team: TEAM.village,
    wake_up_time: WAKE.day,
    card_name: 'villager',
    rules: rules_role.rules_villager
  },
  {
    id: 13,
    expansion: EXPANSION.werewolf,
    display_name: ROLES.role_villager,
    team: TEAM.village,
    wake_up_time: WAKE.day,
    card_name: 'villager',
    rules: rules_role.rules_villager
  },
  {
    id: 14,
    expansion: EXPANSION.werewolf,
    display_name: ROLES.role_villager,
    team: TEAM.village,
    wake_up_time: WAKE.day,
    card_name: 'villager',
    rules: rules_role.rules_villager
  },
  {
    id: 15,
    expansion: EXPANSION.werewolf,
    display_name: ROLES.role_werewolf,
    team: TEAM.werewolf,
    wake_up_time: WAKE.night,
    card_name: 'werewolf',
    rules: rules_role.rules_werewolf
  },
  {
    id: 16,
    expansion: EXPANSION.werewolf,
    display_name: ROLES.role_werewolf,
    team: TEAM.werewolf,
    wake_up_time: WAKE.night,
    card_name: 'werewolf',
    rules: rules_role.rules_werewolf
  },
  {
    id: 17,
    expansion: EXPANSION.daybreak,
    display_name: ROLES.role_alphawolf,
    team: TEAM.werewolf,
    wake_up_time: WAKE.night,
    card_name: 'alpha_wolf',
    rules: rules_role.rules_alphawolf
  },
  {
    id: 18,
    expansion: EXPANSION.daybreak,
    display_name: ROLES.role_apprenticeseer,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'apprentice_seer',
    rules: rules_role.rules_appseer
  },
  {
    id: 19,
    expansion: EXPANSION.daybreak,
    display_name: ROLES.role_bodyguard,
    team: TEAM.village,
    wake_up_time: WAKE.day,
    card_name: 'bodyguard',
    rules: rules_role.rules_bodyguard
  },
  {
    id: 20,
    expansion: EXPANSION.daybreak,
    display_name: ROLES.role_curator,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'curator',
    rules: rules_role.rules_curator
  },
  {
    id: 21,
    expansion: EXPANSION.daybreak,
    display_name: ROLES.role_dreamwolf,
    team: TEAM.werewolf,
    wake_up_time: WAKE.day,
    card_name: 'dream_wolf',
    rules: rules_role.rules_dreamwolf
  },
  {
    id: 22,
    expansion: EXPANSION.daybreak,
    display_name: ROLES.role_mysticwolf,
    team: TEAM.werewolf,
    wake_up_time: WAKE.night,
    card_name: 'mystic_wolf',
    rules: rules_role.rules_mysticwolf
  },
  {
    id: 23,
    expansion: EXPANSION.daybreak,
    display_name: ROLES.role_paranormalinvestigator,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'paranormal_investigator',
    rules: rules_role.rules_pi
  },
  {
    id: 24,
    expansion: EXPANSION.daybreak,
    display_name: ROLES.role_revealer,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'revealer',
    rules: rules_role.rules_revealer
  },
  {
    id: 25,
    expansion: EXPANSION.daybreak,
    display_name: ROLES.role_sentinel,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'sentinel',
    rules: rules_role.rules_sentinel
  },
  {
    id: 26,
    expansion: EXPANSION.daybreak,
    display_name: ROLES.role_villageidiot,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'village_idiot',
    rules: rules_role.rules_vidiot
  },
  {
    id: 27,
    expansion: EXPANSION.daybreak,
    display_name: ROLES.role_witch,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'witch',
    rules: rules_role.rules_witch
  },
  {
    id: 28,
    expansion: EXPANSION.vampire,
    display_name: ROLES.role_apprenticeassassin,
    team: TEAM.own,
    wake_up_time: WAKE.dusk,
    card_name: 'apprentice_assassin',
    rules: rules_role.rules_appassassin
  },
  {
    id: 29,
    expansion: EXPANSION.vampire,
    display_name: ROLES.role_assassin,
    team: TEAM.own,
    wake_up_time: WAKE.dusk,
    card_name: 'assassin',
    rules: rules_role.rules_assassin
  },
  {
    id: 30,
    expansion: EXPANSION.vampire,
    display_name: ROLES.role_copycat,
    team: TEAM.village,
    wake_up_time: WAKE.twilight,
    card_name: 'copycat',
    rules: rules_role.rules_copycat
  },
  {
    id: 31,
    expansion: EXPANSION.vampire,
    display_name: ROLES.role_cupid,
    team: TEAM.village,
    wake_up_time: WAKE.dusk,
    card_name: 'cupid',
    rules: rules_role.rules_cupid
  },
  {
    id: 32,
    expansion: EXPANSION.vampire,
    display_name: ROLES.role_diseased,
    team: TEAM.village,
    wake_up_time: WAKE.dusk,
    card_name: 'diseased',
    rules: rules_role.rules_diseased
  },
  {
    id: 33,
    expansion: EXPANSION.vampire,
    display_name: ROLES.role_gremlin,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'gremlin',
    rules: rules_role.rules_gremlin
  },
  {
    id: 34,
    expansion: EXPANSION.vampire,
    display_name: ROLES.role_instigator,
    team: TEAM.village,
    wake_up_time: WAKE.dusk,
    card_name: 'instigator',
    rules: rules_role.rules_instigator
  },
  {
    id: 35,
    expansion: EXPANSION.vampire,
    display_name: ROLES.role_marksman,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'marksman',
    rules: rules_role.rules_marksman
  },
  {
    id: 36,
    expansion: EXPANSION.vampire,
    display_name: ROLES.role_pickpocket,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'pickpocket',
    rules: rules_role.rules_pickpocket
  },
  {
    id: 37,
    expansion: EXPANSION.vampire,
    display_name: ROLES.role_priest,
    team: TEAM.village,
    wake_up_time: WAKE.dusk,
    card_name: 'priest',
    rules: rules_role.rules_priest
  },
  {
    id: 38,
    expansion: EXPANSION.vampire,
    display_name: ROLES.role_renfield,
    team: TEAM.vampire,
    wake_up_time: WAKE.dusk,
    card_name: 'renfield',
    rules: rules_role.rules_renfield
  },
  {
    id: 39,
    expansion: EXPANSION.vampire,
    display_name: ROLES.role_thecount,
    team: TEAM.vampire,
    wake_up_time: WAKE.dusk,
    card_name: 'the_count',
    rules: rules_role.rules_count
  },
  {
    id: 40,
    expansion: EXPANSION.vampire,
    display_name: ROLES.role_themaster,
    team: TEAM.vampire,
    wake_up_time: WAKE.dusk,
    card_name: 'the_master',
    rules: rules_role.rules_master
  },
  {
    id: 41,
    expansion: EXPANSION.vampire,
    display_name: ROLES.role_vampire,
    team: TEAM.vampire,
    wake_up_time: WAKE.dusk,
    card_name: 'vampire',
    rules: rules_role.rules_vampire
  },
  {
    id: 42,
    expansion: EXPANSION.alien,
    display_name: ROLES.role_alien,
    team: TEAM.alien,
    wake_up_time: WAKE.night,
    card_name: 'alien',
    rules: rules_role.rules_alien
  },
  {
    id: 43,
    expansion: EXPANSION.alien,
    display_name: ROLES.role_alien,
    team: TEAM.alien,
    wake_up_time: WAKE.night,
    card_name: 'alien',
    rules: rules_role.rules_alien
  },
  {
    id: 44,
    expansion: EXPANSION.alien,
    display_name: ROLES.role_blob,
    team: TEAM.own,
    wake_up_time: WAKE.night,
    card_name: 'blob',
    rules: rules_role.rules_blob
  },
  {
    id: 45,
    expansion: EXPANSION.alien,
    display_name: ROLES.role_cow,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'cow',
    rules: rules_role.rules_cow
  },
  {
    id: 46,
    expansion: EXPANSION.alien,
    display_name: ROLES.role_exposer,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'exposer',
    rules: rules_role.rules_exposer
  },
  {
    id: 47,
    expansion: EXPANSION.alien,
    display_name: ROLES.role_groob,
    team: TEAM.alien,
    wake_up_time: WAKE.night,
    card_name: 'groob',
    rules: rules_role.rules_groob
  },
  {
    id: 48,
    expansion: EXPANSION.alien,
    display_name: ROLES.role_leader,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'leader',
    rules: rules_role.rules_leader
  },
  {
    id: 49,
    expansion: EXPANSION.alien,
    display_name: ROLES.role_mortician,
    team: TEAM.own,
    wake_up_time: WAKE.night,
    card_name: 'mortician',
    rules: rules_role.rules_mortician
  },
  {
    id: 50,
    expansion: EXPANSION.alien,
    display_name: ROLES.role_oracle,
    team: TEAM.village,
    wake_up_time: WAKE.twilight,
    card_name: 'oracle',
    rules: rules_role.rules_oracle
  },
  {
    id: 51,
    expansion: EXPANSION.alien,
    display_name: ROLES.role_psychic,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'psychic',
    rules: rules_role.rules_psychic
  },
  {
    id: 52,
    expansion: EXPANSION.alien,
    display_name: ROLES.role_rascal,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'rascal',
    rules: rules_role.rules_rascal
  },
  {
    id: 53,
    expansion: EXPANSION.alien,
    display_name: ROLES.role_synthetic,
    team: TEAM.own,
    wake_up_time: WAKE.night,
    card_name: 'synthetic_alien',
    rules: rules_role.rules_synthetic
  },
  {
    id: 54,
    expansion: EXPANSION.alien,
    display_name: ROLES.role_zerb,
    team: TEAM.alien,
    wake_up_time: WAKE.night,
    card_name: 'zerb',
    rules: rules_role.rules_zerb
  },
  {
    id: 55,
    expansion: EXPANSION.supervillains,
    display_name: ROLES.role_annoyinglad,
    team: TEAM.hero,
    wake_up_time: WAKE.night,
    card_name: 'annoying_lad',
    rules: rules_role.rules_annoylad
  },
  {
    id: 56,
    expansion: EXPANSION.supervillains,
    display_name: ROLES.role_detector,
    team: TEAM.hero,
    wake_up_time: WAKE.night,
    card_name: 'detector',
    rules: rules_role.rules_detector
  },
  {
    id: 57,
    expansion: EXPANSION.supervillains,
    display_name: ROLES.role_drpeeker,
    team: TEAM.villain,
    wake_up_time: WAKE.night,
    card_name: 'dr_peeker',
    rules: rules_role.rules_drpeeker
  },
  {
    id: 58,
    expansion: EXPANSION.supervillains,
    display_name: ROLES.role_evilometer,
    team: TEAM.hero,
    wake_up_time: WAKE.night,
    card_name: 'evilometer',
    rules: rules_role.rules_evilometer
  },
  {
    id: 59,
    expansion: EXPANSION.supervillains,
    display_name: ROLES.role_flipper,
    team: TEAM.hero,
    wake_up_time: WAKE.night,
    card_name: 'flipper',
    rules: rules_role.rules_flipper
  },
  {
    id: 60,
    expansion: EXPANSION.supervillains,
    display_name: ROLES.role_henchman,
    team: TEAM.villain,
    wake_up_time: WAKE.night,
    card_name: 'henchman_7',
    rules: rules_role.rules_henchman
  },
  {
    id: 61,
    expansion: EXPANSION.supervillains,
    display_name: ROLES.role_innocentbystander,
    team: TEAM.own,
    wake_up_time: WAKE.day,
    card_name: 'innocent_bystander',
    rules: rules_role.rules_innocentbystander
  },
  {
    id: 62,
    expansion: EXPANSION.supervillains,
    display_name: ROLES.role_intern,
    team: TEAM.own,
    wake_up_time: WAKE.night,
    card_name: 'intern',
    rules: rules_role.rules_intern
  },
  {
    id: 63,
    expansion: EXPANSION.supervillains,
    display_name: ROLES.role_madscientist,
    team: TEAM.own,
    wake_up_time: WAKE.day,
    card_name: 'mad_scientist',
    rules: rules_role.rules_madscientist
  },
  {
    id: 64,
    expansion: EXPANSION.supervillains,
    display_name: ROLES.role_mirrorman,
    team: TEAM.hero,
    wake_up_time: WAKE.twilight,
    card_name: 'mirror_man',
    rules: rules_role.rules_mirrorman
  },
  {
    id: 65,
    expansion: EXPANSION.supervillains,
    display_name: ROLES.role_rapscallion,
    team: TEAM.villain,
    wake_up_time: WAKE.night,
    card_name: 'rapscallion',
    rules: rules_role.rules_rapscallion
  },
  {
    id: 66,
    expansion: EXPANSION.supervillains,
    display_name: ROLES.role_roleretriever,
    team: TEAM.hero,
    wake_up_time: WAKE.night,
    card_name: 'role_retriever',
    rules: rules_role.rules_roleretriever
  },
  {
    id: 67,
    expansion: EXPANSION.supervillains,
    display_name: ROLES.role_selfawarenessgirl,
    team: TEAM.hero,
    wake_up_time: WAKE.night,
    card_name: 'self_awareness_girl',
    rules: rules_role.rules_selfag
  },
  {
    id: 68,
    expansion: EXPANSION.supervillains,
    display_name: ROLES.role_switcheroo,
    team: TEAM.hero,
    wake_up_time: WAKE.night,
    card_name: 'switcheroo',
    rules: rules_role.rules_switcheroo
  },
  {
    id: 69,
    expansion: EXPANSION.supervillains,
    display_name: ROLES.role_temptress,
    team: TEAM.villain,
    wake_up_time: WAKE.night,
    card_name: 'temptress',
    rules: rules_role.rules_temptress
  },
  {
    id: 70,
    expansion: EXPANSION.supervillains,
    display_name: ROLES.role_voodoolou,
    team: TEAM.hero,
    wake_up_time: WAKE.night,
    card_name: 'voodoo_lou',
    rules: rules_role.rules_voodoolou
  },
  {
    id: 71,
    expansion: EXPANSION.bonusroles,
    display_name: ROLES.role_apprenticetanner,
    team: TEAM.own,
    wake_up_time: WAKE.night,
    card_name: 'apprentice_tanner',
    rules: rules_role.rules_apptanner
  },
  {
    id: 72,
    expansion: EXPANSION.bonusroles,
    display_name: ROLES.role_auraseer,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'aura_seer',
    rules: rules_role.rules_auraseer
  },
  {
    id: 73,
    expansion: EXPANSION.bonusroles,
    display_name: ROLES.role_beholder,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'beholder',
    rules: rules_role.rules_beholder
  },
  {
    id: 74,
    expansion: EXPANSION.bonusroles,
    display_name: ROLES.role_bodysnatcher,
    team: TEAM.alien,
    wake_up_time: WAKE.night,
    card_name: 'body_snatcher',
    rules: rules_role.rules_bodysnatcher
  },
  {
    id: 75,
    expansion: EXPANSION.bonusroles,
    display_name: ROLES.role_cursed,
    team: TEAM.village,
    wake_up_time: WAKE.day,
    card_name: 'cursed',
    rules: rules_role.rules_cursed
  },
  {
    id: 76,
    expansion: EXPANSION.bonusroles,
    display_name: ROLES.role_defenderer,
    team: TEAM.hero,
    wake_up_time: WAKE.day,
    card_name: 'defender_er',
    rules: rules_role.rules_defenderer
  },
  {
    id: 77,
    expansion: EXPANSION.bonusroles,
    display_name: ROLES.role_empath,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'empath',
    rules: rules_role.rules_empath
  },
  {
    id: 78,
    expansion: EXPANSION.bonusroles,
    display_name: ROLES.role_familyman,
    team: TEAM.own,
    wake_up_time: WAKE.night,
    card_name: 'family_man',
    rules: rules_role.rules_familyman
  },
  {
    id: 79,
    expansion: EXPANSION.bonusroles,
    display_name: ROLES.role_innocentbystander,
    team: TEAM.own,
    wake_up_time: WAKE.day,
    card_name: 'innocent_bystander',
    rules: rules_role.rules_innocentbystander
  },
  {
    id: 80,
    expansion: EXPANSION.bonusroles,
    display_name: ROLES.role_nostradamus,
    team: TEAM.own,
    wake_up_time: WAKE.night,
    card_name: 'nostradamus',
    rules: rules_role.rules_nostradamus
  },
  {
    id: 81,
    expansion: EXPANSION.bonusroles,
    display_name: ROLES.role_prince,
    team: TEAM.village,
    wake_up_time: WAKE.day,
    card_name: 'prince',
    rules: rules_role.rules_prince
  },
  {
    id: 82,
    expansion: EXPANSION.bonusroles,
    display_name: ROLES.role_ricochetrhino,
    team: TEAM.hero,
    wake_up_time: WAKE.day,
    card_name: 'ricochet_rhino',
    rules: rules_role.rules_rhino
  },
  {
    id: 83,
    expansion: EXPANSION.bonusroles,
    display_name: ROLES.role_squire,
    team: TEAM.werewolf,
    wake_up_time: WAKE.night,
    card_name: 'squire',
    rules: rules_role.rules_squire
  },
  {
    id: 84,
    expansion: EXPANSION.bonusroles,
    display_name: ROLES.role_thesponge,
    team: TEAM.hero,
    wake_up_time: WAKE.day,
    card_name: 'the_sponge',
    rules: rules_role.rules_thesponge
  },
  {
    id: 85,
    expansion: EXPANSION.bonusroles,
    display_name: ROLES.role_thing,
    team: TEAM.village,
    wake_up_time: WAKE.night,
    card_name: 'thing',
    rules: rules_role.rules_thing
  },
  {
    id: 86,
    expansion: EXPANSION.bonusroles,
    display_name: ROLES.role_windywendy,
    team: TEAM.hero,
    wake_up_time: WAKE.day,
    card_name: 'windy_wendy',
    rules: rules_role.rules_windywendy
  },
  {
    id: 87,
    expansion: '',
    display_name: 'Unknown',
    team: 'unknown',
    wake_up_time: WAKE.day,
    card_name: 'empty',
    rules: 'unknown'
  }
]
