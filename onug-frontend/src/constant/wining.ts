//TODO basic wining condition descriptions!

export const wining_role: Record<string, string> = {
  wining_alien:
    'Wake and look for the other aliens and then do the action as instructed by the app.',
  wining_alphawolf:
    'Wake with the other werewolves, then wake again and give the center werewolf card to a non werewolf player.',
  wining_annoylad:
    'Is a hero who taps the shoulder of one of his neighbors several times until it gets well annoying.',
  wining_appassassin:
    'You win, if the assassin is killed. If the assassin is not in front of any player, you are the assassin.',
  wining_appseer: 'View one center card.',
  wining_apptanner: 'If there is no tanner, you win only if you are killed.',
  wining_assassin:
    'Give a player the mark of the assassin, you win, if that player is killed.',
  wining_auraseer: 'You know, who has moved or viewed a card',
  wining_beholder:
    'You know who the seer is and view her card to see if she is still the seer.',
  wining_blob: 'Keep all players that are part of the blob, alive.',
  wining_bodyguard: "The player you point at, can't be killed.",
  wining_bodysnatcher:
    'Wake with the other aliens, then wake again and exchange your card with another card as instructed by the app view your new card, which is now an alien and on the alien team.',
  wining_copycat:
    "View one center card. You are that role and we'll wake up when that role is called.",
  wining_count:
    'Wake with the other vampires, wake again to give a player the mark of fear, which prevents them from waking and using their night action.',
  wining_cow:
    'If your fist is tapped, that means at least one of your neighbors is an alien.',
  wining_cupid:
    'Give any two players a mark of love. If a player with a mark of love is killed, the other player with a mark of love also dies.',
  wining_curator:
    'Give any player an artifact which might change their team or cause them to do something unusual.',
  wining_cursed: 'If a werewolf points at you, you become a werewolf.',
  wining_defenderer:
    "Prevents the player she is pointing at from being caught. Those pointing fingers are ignored and the player who isn't being pointed at by the defender with the most fingers pointed at them is caught instead.",
  wining_detector:
    "Is a hero who may view any other player's card or two of the center cards.",
  wining_diseased:
    'Give one of your neighbors a mark of disease. If anyone points at you or the player with the mark of disease, they lose even if their team won.',
  wining_doppelganger:
    "Look at any other player's card. You are now that role, in addition to the player with that role card.",
  wining_dreamwolf:
    'You are on the werewolf team, but instead of waking up with them, you just stick out your thumb.',
  wining_drpeeker:
    "Wakes up with the other supervillains and then may view one other player's card.",
  wining_drunk:
    'Exchange your card with a card from the center, but do not look at your new card.',
  wining_empath:
    'Observe some of the players point at other players as instructed by the app.',
  wining_evilometer:
    'Is a hero who detects nearby supervillains by having her fist tapped if a supervillain is sitting next to her.',
  wining_exposer: 'Turn 1, 2 or 3 cards face up as instructed by the app',
  wining_familyman:
    'Wins if everyone in his family, including himself does not get caught each night, different players are added to his family, family man can win if any other team wins.',
  wining_flipper:
    'Is a hero who flips any card face up. If that card is not a hero, he flips it back over, face down.',
  wining_gremlin: 'Switch marks or cards between any two players.',
  wining_groob:
    'Wake with the other aliens, then wake again to look for Zerb. You win if Zerb is killed.',
  wining_henchman:
    "Is a super villain who wakes up with the other super villains, but doesn't get to do anything special at that time.",
  wining_hunter:
    'If you get the most votes,the player you are pointing at is also killed.',
  wining_innocentbystander:
    "Isn't a hero, but he wins, if the heroes find a super villain as for him, really being innocent, that's up for debate.",
  wining_insomniac: 'View your own card.',
  wining_instigator:
    'Give any other player the mark of the traitor, that player now wins, if anyone on his team is killed.',
  wining_intern:
    'Knows who the mad scientist is and wins, If the mad scientist gets caught, if there is no mad scientist in the game, the intern must get caught in order to win.',
  wining_leader:
    'You know who the aliens are. If both Zerb and Groob are in the game, you can only win if neither one of them dies.',
  wining_madscientist:
    'Did something terrible and will only win if he gets caught, if the mad scientist gets caught, all the heroes and super villains lose.',
  wining_mason: 'Wake and look for the other mason.',
  wining_master:
    "Wake with the other vampires. If all the vampires point at you during the vote, you can't be killed.",
  wining_marksman:
    'View the mark of one player and the card of another player.',
  wining_minion:
    'You know who the werewolves are. You win if no werewolves are killed, even if you are killed.',
  wining_mirrorman:
    'Starts as a hero, but then he looks at one of the center cards and becomes that role for the rest of the game. Waking up when that role is called.',
  wining_mortician: 'You win if either of your neighbors is killed.',
  wining_mysticwolf:
    "Wake with the other werewolves, then wake again and view any other player's card.",
  wining_nostradamus:
    "View up to three cards. If you see a card that isn't a villager stop viewing and tell the app what card you viewed.",
  wining_oracle: 'Answer the app.',
  wining_pi:
    "View up to two cards, if you see a card that isn't a villager, stop viewing and you are now that role.",
  wining_pickpocketing:
    'Exchange your mark with the mark from another player and view your new mark.',
  wining_priest: 'Give yourself and one other player a mark of clarity.',
  wining_prince: 'You cannot be killed.',
  wining_psychic: 'View cards as instructed by the app.',
  wining_rapscallion:
    'Wakes up with the other super villains and then may view one of the center cards.',
  wining_rascal: 'Exchange cards between two players as instructed by the app.',
  wining_renfield:
    'You know who the vampires are. You are not a vampire, but you are on their team and win with them even if you are killed.',
  wining_revealer:
    "Turn any other player's card face up and leave it face up unless you see a card that isn't on the village team.",
  wining_rhino:
    'Is on the hero team. If ricochet Rhino has the most players pointing at him, the player he is pointing at is caught instead of him.',
  wining_robber:
    "Exchange your card with another player's card and view your new card.",
  wining_roleretriever:
    'Is a canine hero who exchanges his roll card for the card of another player and then looks at his new card. He does not wake up later in the night if that role is called.',
  wining_seer:
    'View either two of the center cards or one card from any other player.',
  wining_selfag: 'Is a hero who may view her own card to see if it is changed.',
  wining_sentinel:
    "Give any other player's card, a shield token, that card cannot be moved or viewed.",
  wining_squire:
    'You know who the werewolves are and check their cards to make sure they are still werewolves.',
  wining_switcheroo:
    'Is a hero who may switch cards between two other players but may not look at either card.',
  wining_synthetic:
    'Wake with the other aliens. You win and everyone else loses if you are killed.',
  wining_tanner: 'You win and everyone else loses if you are killed.',
  wining_temptress:
    'Wakes up with the others super villains and then may turn any player who is not a super villain into a villain by exchanging his card with the new villain card.',
  wining_thesponge:
    "Is a hero who can't be caught, because he's all spongy. Instead the player with the second most fingers pointing at them is caught.",
  wining_thing: 'Tap one of your neighbors.',
  wining_troublemaker: 'Exchange cards between any two other players.',
  wining_vampire:
    'Look for the other vampires and turn another player into a vampire. You win if no vampires are killed.',
  wining_vidiot:
    'Move all cards except yours one space to the left or to the right.',
  wining_villager:
    'Figure out who the bad guys are and make sure one of them is killed.',
  wining_voodoolou:
    "He is a hero who may view a center card. And if he does, he must exchange that card with any player's card.",
  wining_werewolf:
    'Wake and look for the other werewolves. You win if no werewolves are killed.',
  wining_windywendy:
    'Is a hero unless a super villain points at her, in which case, she decides to become a villain and joins the villain team.',
  wining_witch:
    "View a center card and exchange it with any other player's card.",
  wining_zerb:
    'Wake with the other aliens, then wake again to look for Groob, you win, if Groob is killed.',
}
