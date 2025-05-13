/* TODO only 1 selectable?  - with obligatory: true, if false, we dont need to set this
    also in this case if we call role Response function: TODO need to fix playerhistory for validator

    const isSingleSelectable = selectablePlayerNumbers.length === 1
  
      if (isSingleSelectable) {
  
        apprenticeassassinResponse(gamestate, token, selectablePlayerNumbers, title)
  
      } else if (selectablePlayerNumbers.length > 1) { 


      obligatories: aliens_left, aliens_right, aliens_show, aliens_newalien, aliens_alienhelper, alphawolf, assassin, bodysnatcher, copycat, cupid, diseased, doppelganger, drunk, exposer, nostradamus, oracle, rascal_witchend, rascal_drunk, temptress, thecount, thing, vampires, witch after looked centercard

*/

/* TODO consider this solution for reset the players card, like at drunk

  const shouldResetPlayerCardId = () => {
    if (showCards.some(card => gamestate.players[token].card.player_original_id === card.id)) {
      return true
    }
    if (cardPositions.length === 1 && currentPlayerNumber === cardPositions[0] && showCards[0].card.id === gamestate.players[token].card.player_original_id) {
      return false
    }
    return true
  }
    
  */

//TODO check everywhere scene_end and/or obligatory set on value?

//TODO dreamwolf?

/* export const priest_kickoff = 'PRIEST,'
export const priest_kickoff2 = 'give yourself a Mark of Clarity. You may also give any other player a Mark of Clarity.' */

export * from './aliens/aliens.action'
export * from './aliens/aliens.constants'
export * from './aliens/aliens'
export * from './aliens/aliens.narration'
export * from './aliens/aliens.response'

export * from './alphawolf/alphawolf.action'
export * from './alphawolf/alphawolf'
export * from './alphawolf/alphawolf.response'

export * from './annoyinglad/annoyinglad'

export * from './apprenticeassassin/apprenticeassassin.action'
export * from './apprenticeassassin/apprenticeassassin'
export * from './apprenticeassassin/apprenticeassassin.response'

export * from './apprenticeseer/apprenticeseer.action'
export * from './apprenticeseer/apprenticeseer'
export * from './apprenticeseer/apprenticeseer.response'

export * from './apprenticetanner/apprenticetanner.action'
export * from './apprenticetanner/apprenticetanner'

export * from './assassin/assassin.action'
export * from './assassin/assassin'
export * from './assassin/assassin.response'

export * from './auraseer/auraseer.action'
export * from './auraseer/auraseer'

export * from './beholder/beholder.action'
export * from './beholder/beholder'
export * from './beholder/beholder.response'

export * from './blob/blob.action'
export * from './blob/blob.constants'
export * from './blob/blob'
export * from './blob/blob.narrration'

export * from './bodysnatcher/bodysnatcher.action'
export * from './bodysnatcher/bodysnatcher.constants'
export * from './bodysnatcher/bodysnatcher'
export * from './bodysnatcher/bodysnatcher.narration'
export * from './bodysnatcher/bodysnatcher.response'

export * from './copycat/copycat.action'
export * from './copycat/copycat'
export * from './copycat/copycat.response'

export * from './cow/cow.action'
export * from './cow/cow'

export * from './cupid/cupid.action'
export * from './cupid/cupid'
export * from './cupid/cupid.response'

export * from './curator/curator.action'
export * from './curator/curator'
export * from './curator/curator.response'

export * from './detector/detector'

export * from './diseased/diseased.action'
export * from './diseased/diseased'
export * from './diseased/diseased.response'

export * from './doppelganger/doppelganger.action'
export * from './doppelganger/doppelganger'
export * from './doppelganger/doppelganger.response'
export * from './doppelganger/doppelgangerinstantaction.action'
export * from './doppelganger/doppelgangerinstantaction.constants'
export * from './doppelganger/doppelgangerinstantaction'
export * from './doppelganger/doppelgangerinstantaction.narration'
export * from './doppelganger/doppelgangerinstantaction.response'

export * from './drpeeker/drpeeker'

export * from './drunk/drunk.action'
export * from './drunk/drunk'
export * from './drunk/drunk.response'

export * from './empath/empath.action'
export * from './empath/empath.constants'
export * from './empath/empath'
export * from './empath/empath.narration'
export * from './empath/empath.response'

export * from './epicbattle/epicbattle.action'
export * from './epicbattle/epicbattle.constants'
export * from './epicbattle/epicbattle'

export * from './everyonemark/everyonemark.action'
export * from './everyonemark/everyonemark'

export * from './evilometer/evilometer.action'
export * from './evilometer/evilometer'

export * from './exposer/exposer.action'
export * from './exposer/exposer.constants'
export * from './exposer/exposer'
export * from './exposer/exposer.narration'
export * from './exposer/exposer.response'

export * from './familyman/familyman.action'
export * from './familyman/familyman.constants'
export * from './familyman/familyman'
export * from './familyman/familyman.narration'

export * from './flipper/flipper.action'
export * from './flipper/flipper'
export * from './flipper/flipper.response'

export * from './gremlin/gremlin.action'
export * from './gremlin/gremlin'
export * from './gremlin/gremlin.response'

export * from './groobzerb/groobzerb.action'
export * from './groobzerb/groobzerb'

export * from './insomniac/insomniac.action'
export * from './insomniac/insomniac'

export * from './instigator/instigator.action'
export * from './instigator/instigator'
export * from './instigator/instigator.response'

export * from './intern/intern.action'
export * from './intern/intern'

export * from './joke/joke.action'
export * from './joke/joke.constants'
export * from './joke/joke'

export * from './leader/leader.action'
export * from './leader/leader'

export * from './leaderzerbgroob/leaderzerbgroob.action'
export * from './leaderzerbgroob/leaderzerbgroob'

export * from './lovers/lovers.action'
export * from './lovers/lovers'

export * from './madscientist/madscientist.constants'
export * from './madscientist/madscientist'

export * from './marksman/marksman.action'
export * from './marksman/marksman'
export * from './marksman/marksman.response'

export * from './masons/masons.action'
export * from './masons/masons'

export * from './minion/minion.action'
export * from './minion/minion'

export * from './mirrorman/mirrorman'

export * from './mortician/mortician.action'
export * from './mortician/mortician.constants'
export * from './mortician/mortician'
export * from './mortician/mortician.narration'
export * from './mortician/mortician.response'

export * from './mysticwolf/mysticwolf.action'
export * from './mysticwolf/mysticwolf'
export * from './mysticwolf/mysticwolf.response'

export * from './nostradamus/nostradamus.action'
export * from './nostradamus/nostradamus'
export * from './nostradamus/nostradamus.response'
export * from './nostradamus/nostradamusreaction.action'
export * from './nostradamus/nostradamusreaction'

export * from './openeyes/openeyes.action'
export * from './openeyes/openeyes'

export * from './oracle/oracle.constants'
export * from './oracle/oracleanswer.action'
export * from './oracle/oracleanswer'
export * from './oracle/oracleanswer.narration'
export * from './oracle/oracleanswer.response'
export * from './oracle/oraclequestion.action'
export * from './oracle/oraclequestion'
export * from './oracle/oraclequestion.narration'
export * from './oracle/oraclequestion.response'

export * from './paranormalinvestigator/paranormalinvestigator.action'
export * from './paranormalinvestigator/paranormalinvestigator'
export * from './paranormalinvestigator/paranormalinvestigator.response'

export * from './pickpocket/pickpocket.action'
export * from './pickpocket/pickpocket'
export * from './pickpocket/pickpocket.response'

export * from './priest/priest.action'
export * from './priest/priest'
export * from './priest/priest.response'

export * from './psychic/psychic.action'
export * from './psychic/psychic.constants'
export * from './psychic/psychic'
export * from './psychic/psychic.narration'
export * from './psychic/psychic.response'

export * from './rapscallion/rapscallion'

export * from './rascal/rascal.action'
export * from './rascal/rascal.constants'
export * from './rascal/rascal'
export * from './rascal/rascal.narration'
export * from './rascal/rascal.response'

export * from './renfield/renfield.action'
export * from './renfield/renfield'

export * from './revealer/revealer.action'
export * from './revealer/revealer'
export * from './revealer/revealer.response'

export * from './ripple/ripple.action'
export * from './ripple/ripple.constants'
export * from './ripple/ripple'

export * from './robber/robber.action'
export * from './robber/robber'
export * from './robber/robber.response'

export * from './roleretriever/roleretriever'

export * from './seer/seer.action'
export * from './seer/seer'
export * from './seer/seer.response'

export * from './selfawarenessgirl/selfawarenessgirl'

export * from './sentinel/sentinel.action'
export * from './sentinel/sentinel'
export * from './sentinel/sentinel.response'

export * from './squire/squire.action'
export * from './squire/squire'
export * from './squire/squire.response'

export * from './supervillains/supervillains.action'
export * from './supervillains/supervillains'

export * from './switcheroo/switcheroo'

export * from './temptress/temptress.action'
export * from './temptress/temptress'
export * from './temptress/temptress.response'

export * from './thecount/thecount.action'
export * from './thecount/thecount'
export * from './thecount/thecount.response'

export * from './thing/thing.action'
export * from './thing/thing'
export * from './thing/thing.response'

export * from './troublemaker/troublemaker.action'
export * from './troublemaker/troublemaker'
export * from './troublemaker/troublemaker.response'

export * from './vampires/vampires.action'
export * from './vampires/vampires'
export * from './vampires/vampires.response'

export * from './villageidiot/villageidiot.action'
export * from './villageidiot/villageidiot'
export * from './villageidiot/villageidiot.response'

export * from './voodoolou/voodoolou'

export * from './werewolves/werewolves.action'
export * from './werewolves/werewolves'
export * from './werewolves/werewolves.response'

export * from './witch/witch.action'
export * from './witch/witch'
export * from './witch/witch.response'
