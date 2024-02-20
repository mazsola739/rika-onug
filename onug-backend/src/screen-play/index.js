
import { startGamePlay, stopGamePlay } from './game-play';

export default {
    startGamePlay,
    stopGamePlay,
};

/*  Screenplay steps

=>  BACKEND: check in selected cards, which role next, (id or role name?)
    FRONTEND: send narration to everyone, 
    BACKEND & FRONTEND: start action timer
=>  BACKEND: check in known cards the player, who has the role, this player can do their action? 
    (some card swaps not allow to wake up again),if there player with doable action, generate this action 
=>  FRONTEND: send individually to this player message (YOUR TURN), selectable and/or visible options, 
    and / or message about action (example, swap is already done)
=>  BACKEND: wait (until timer) answer from player if need (selected option, card ect.), 
    FRONTEND: and react to their action if need (example select card to look at, we need to show this card) and send message
=>  BACKEND: update changes in storage (player or center card informations)
=>  BACKEND & FRONTEND: timer finish, (if player failed do their action, send a message about missed opportunity,) 
    BACKEND: reset, and move to next action, repeat steps  */


/* Communication plan
send to frontend: broadcast to everyone, message to the selected player(s), "question" and position list to their action (selectable or visible positions), 
send to backend: "answer" with selected position list
send to frontend: confirm action if need in message to the selected player(s) and/or show the result (example: show selected card secretly)
*/


/* TWILIGHT   
oracleStore isCardSelectedById( 50)
copycatStore isCardSelectedById( 30)
mirrormanStore isCardSelectedById( 64)
doppelgangerStore isCardSelectedById( 1)*/

/* DUSK    
vampire areAnyCardSelectedById([41, 40, 39]
    thecount isCardSelectedById(39
    renfield isCardSelectedById(38
    diseased isCardSelectedById(32
    cupid isCardSelectedById(31
    instigator isCardSelectedById(34
    priest isCardSelectedById(37
    assassin areAnyCardSelectedById([29, 28] */

/* NIGHT     
loverStore isCardSelectedById(31)
sentinelStore isCardSelectedById(25)
alienStore areAnyCardSelectedById(alienIds)
groobzerbStore areAllCardsSelectedById([47, 54])
leaderStore isCardSelectedById(48) &&
        areAnyCardSelectedById(alienIds)
bodysnatcherStore isCardSelectedById(74)
supervillainStore (areAnyCardSelectedById([57, 65, 69]) &&
        (isCardSelectedById(60) ||
          areAnyCardSelectedById([58]))) ||
        (areAnyCardSelectedById(supervillainIds) &&
          isCardSelectedById(58))
werewolfStore areAnyCardSelectedById(wolfIds)
alphawolfStore isCardSelectedById(17)
mysticwolfStore isCardSelectedById(22)
minionStore isCardSelectedById(7) &&
        areAnyCardSelectedById(wolfIds)
apprenticetannerStore areAllCardsSelectedById([71, 10])
madscientistStore isCardSelectedById(63)
internStore isCardSelectedById(62)
masonStore areAllCardsSelectedById([5, 6])
thingStore isCardSelectedById(85)
annoyingladStore isCardSelectedById(55)
seerStore isCardSelectedById(9)
apprenticeseerStore isCardSelectedById(18)
paranormalinvestigatorStore isCardSelectedById(23)
marksmanStore isCardSelectedById(35)
nostradamusStore isCardSelectedById(80)
psychicStore isCardSelectedById(51)
detectorStore isCardSelectedById(56)
robberStore isCardSelectedById(8)
witchStore isCardSelectedById(27)
pickpocketStore isCardSelectedById(36)
roleretrieverStore isCardSelectedById(66)
voodoolouStore isCardSelectedById(70)
troublemakerStore isCardSelectedById(11)
villageidiotStore isCardSelectedById(26)
auraseerStore isCardSelectedById(72)
gremlinStore isCardSelectedById(33)
rascalStore isCardSelectedById(52)
switcherooStore isCardSelectedById(68)
drunkStore isCardSelectedById(2)
insomniacStore isCardSelectedById(4)
selfawarenessgirlStore isCardSelectedById(67)
squireStore isCardSelectedById(83) &&
        areAnyCardSelectedById(wolfIds)
beholderStore isCardSelectedById(73) &&
        areAnyCardSelectedById([9, 18])
revealerStore isCardSelectedById(24)
exposerStore isCardSelectedById(46)
flipperStore isCardSelectedById(59)
empathStore isCardSelectedById(77)
curatorStore isCardSelectedById(20)
blobStore isCardSelectedById(44)
morticiansStore isCardSelectedById(49)
familymanStore isCardSelectedById(78) */