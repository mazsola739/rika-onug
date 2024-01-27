const { roles } = require("./roles");

exports.interactionHandler = (gameState) => {
  const sceneTitle = gameState.sceneTitle;

  switch (sceneTitle) {
    // case "CARD_SELECTION":// (Scene Number 0)
    // case "EVERYONE_CARD":// (Scene Number: 1)
    /*  T W I L L I G H T  */
    case "ORACLE_QUESTION": // (Scene Number: 2)
      return roles.oracle_question();
    case "ORACLE_REACTION": // (Scene Number: 3)
      return roles.oracle_reaction();
    case "COPYCAT": // (Scene Number: 4)
      return roles.copycat();
    case "MIRROR_MAN": // (Scene Number: 5)
      return roles.mirrorman();
    case "DOPPELGÄNGER": // (Scene Number: 6)
      return roles.doppelganger();
    case "DOPPELGÄNGER_INSTANT_ACTION": // (Scene Number: 7)
      return roles.doppelganger_instant_action();
    /*  D U S K */
    case "VAMPIRES": // (Scene Number: 8)
      return roles.vampires();
    case "THE_COUNT": // (Scene Number: 9)
      return roles.thecount();
    case "DOPPELGÄNGER_THE_COUNT": // (Scene Number: 10)
      return roles.doppelganger_thecount();
    case "RENFIELD": // (Scene Number: 11)
      return roles.renfield();
    case "DISEASED": // (Scene Number: 12)
      return roles.diseased();
    case "CUPID": // (Scene Number: 13)
      return roles.cupid();
    case "INSTIGATOR": // (Scene Number: 14)
      return roles.instigator();
    case "PRIEST": // (Scene Number: 15)
      return roles.priest();
    case "DOPPELGÄNGER_PRIEST": // (Scene Number: 16)
      return roles.doppelganger_priest();
    case "ASSASSIN": // (Scene Number: 17)return roles.assassin();
      return roles.assassin();
    case "DOPPELGÄNGER_ASSASSIN": // (Scene Number: 18)
      return roles.doppelganger_assassin();
    case "APPRENTICE_ASSASSIN": // (Scene Number: 19)
      return roles.apprenticeassassin();
    case "DOPPELGÄNGER_APPRENTICE_ASSASSIN": // (Scene Number: 20)
      return roles.doppelganger_apprenticeassassin();
    case "EVERYONE_MARK": // (Scene Number: 21)
    /*  N I G H T */
    case "LOVERS": // (Scene Number: 22)
      return roles.lovers();
    case "SENTINEL": // (Scene Number: 24)
      return roles.sentinel();
    case "ALIENS": // (Scene Number: 25)
      return roles.aliens();
    case "COW": // (Scene Number: 26)
      return roles.cow();
    case "GROOB_ZERB": // (Scene Number: 27)
      return roles.groobzerb();
    case "LEADER": // (Scene Number: 28)
      return roles.leader();
    case "LEADER_ZERB_GROOB": // (Scene Number: 29)
      return roles.leader_zerbgroob();
    case "BODY_SNATCHER": // (Scene Number: 30)
      return roles.bodysnatcher();
    case "DOPPELGÄNGER_BODY_SNATCHER": // (Scene Number: 31)
      return roles.doppelganger_bodysnatcher();
    case "SUPER_VILLAINS": // (Scene Number: 32)
      return roles.supervillains();
    case "TEMPTRESS": // (Scene Number: 33)
      return roles.temptress();
    case "DR_PEEKER": // (Scene Number: 34)
      return roles.drpeeker();
    case "RAPSCALLION": // (Scene Number: 35)
      return roles.rapscallion();
    case "EVILOMETER": // (Scene Number: 36)
      return roles.evilometer();
    case "WEREWOLVES": // (Scene Number: 37)
      return roles.werewolves();
    case "ALPHA_WOLF": // (Scene Number: 38)
      return roles.alphawolf();
    case "MYSTIC_WOLF": // (Scene Number: 39)
      return roles.mysticwolf();
    case "MINION": // (Scene Number: 40)
      return roles.minion();
    case "APPRENTICE_TANNER": // (Scene Number: 41)
      return roles.apprenticetanner();
    case "MAD_SCIENTIST": // (Scene Number: 42)
      return roles.madscientist();
    case "INTERN": // (Scene Number: 43)
      return roles.intern();
    case "MASONS": // (Scene Number: 44)
      return roles.masons();
    case "THING": // (Scene Number: 45)
      return roles.thing();
    case "ANNOYING_LAD": // (Scene Number: 46)
      return roles.annoyinglad();
    case "SEER": // (Scene Number: 47)
      return roles.seer();
    case "APPRENTICE_SEER": // (Scene Number: 48)
      return roles.apprenticeseer();
    case "PARANORMAL_INVESTIGATOR": // (Scene Number: 49)
      return roles.paranormalinvestigator();
    case "MARKSMAN": // (Scene Number: 50)
      return roles.marksman();
    case "NOSTRADAMUS": // (Scene Number: 51)
      return roles.nostradamus();
    case "NOSTRADAMUS_REACTION": // (Scene Number: 52)
      return roles.nostradamus_reaction();
    case "PSYCHIC": // (Scene Number: 53)
      return roles.psychic();
    case "DOPPELGÄNGER_PSYCHIC": // (Scene Number: 54)
      return roles.doppelganger_psychic();
    case "DETECTOR": // (Scene Number: 55)
      return roles.detector();
    case "ROBBER": // (Scene Number: 56)
      return roles.robber();
    case "WITCH": // (Scene Number: 57)
      return roles.witch();
    case "PICKPOCKET": // (Scene Number: 58)
      return roles.pickpocket();
    case "DOPPELGÄNGER_PICKPOCKET": // (Scene Number: 59)
      return roles.doppelganger_pickpocket();
    case "ROLE_RETRIEVER": // (Scene Number: 60)
      return roles.roleretriever();
    case "VOODOO_LOU": // (Scene Number: 61)
      return roles.voodoolou();
    case "TROUBLEMAKER": // (Scene Number: 62)
      return roles.troublemaker();
    case "VILLAGE_IDIOT": // (Scene Number: 63)
      return roles.villageidiot();
    case "AURA_SEER": // (Scene Number: 64)
      return roles.auraseer();
    case "GREMLIN": // (Scene Number: 65)
      return roles.gremlin();
    case "DOPPELGÄNGER_GREMLIN": // (Scene Number: 66)
      return roles.doppelganger_gremlin();
    case "RASCAL": // (Scene Number: 67)
      return roles.rascal();
    case "DOPPELGÄNGER_RASCAL": // (Scene Number: 68)
      return roles.doppelganger_rascal();
    case "SWITCHEROO": // (Scene Number: 69)
      return roles.switcheroo();
    case "DRUNK": // (Scene Number: 70)
      return roles.drunk();
    case "INSOMNIAC": // (Scene Number: 71)
      return roles.insomniac();
    case "SELF_AWARENESS_GIRL": // (Scene Number: 72)
      return roles.selfawarenessgirl();
    case "SQUIRE": // (Scene Number: 73)
      return roles.squire();
    case "BEHOLDER": // (Scene Number: 74)
      return roles.beholder();
    case "REVEALER": // (Scene Number: 75)
      return roles.revealer();
    case "DOPPELGÄNGER_REVEALER": // (Scene Number: 76)
      return roles.doppelganger_revealer();
    case "EXPOSER": // (Scene Number: 74)
      return roles.exposer();
    case "DOPPELGÄNGER_EXPOSER": // (Scene Number: 75)
      return roles.doppelganger_exposer();
    case "FLIPPER": // (Scene Number: 76)
      return roles.flipper();
    case "DOPPELGÄNGER_FLIPPER": // (Scene Number: 77)
      return roles.doppelganger_flipper();
    case "EMPATH": // (Scene Number: 78)
      return roles.empath();
    case "DOPPELGÄNGER_EMPATH": // (Scene Number: 79)
      return roles.doppelganger_empath();
    case "CURATOR": // (Scene Number: 80)
      return roles.curator();
    case "DOPPELGÄNGER_CURATOR": // (Scene Number: 81)
      return roles.doppelganger_curator();
    case "BLOB": // (Scene Number: 82)
      return roles.blob();
    case "MORTICIAN": // (Scene Number: 83)
      return roles.mortician();
    case "DOPPELGÄNGER_MORTICIAN": // (Scene Number: 84)
      return roles.doppelganger_mortician();
    case "FAMILY_MAN": // (Scene Number: 85)
      return roles.familyman();
    default:
      return "Unknown scene: " + sceneTitle;

    //Ripple Scene:
    /*  RIPPLE":// (Scene Number: 69) */
    //Day Scenes:
    /*  INVESTIGATION":// (Scene Number: 70)
    VOTE":// (Scene Number: 71)
    WINNERS":// (Scene Number: 72) */
  }
};
