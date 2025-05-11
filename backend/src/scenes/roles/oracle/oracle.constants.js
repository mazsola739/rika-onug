export const randomOracleQuestions = [/*'oracle_alienteam', 'oracle_werewolfteam', 'oracle_vampireteam', 'oracle_alienexchange', 'oracle_centerexchange', 'oracle_viewcenter', */ 'oracle_ripple' /*'oracle_viewplayer', 'oracle_evenodd', 'oracle_guessnumber' */]

export const oracleResponses = {
  oracle_alienteam: {
    yes: ['oracle_alienteam_yes', 'oracle_alienteam_yes2', 'oracle_teamswitch_yes'],
    no: ['oracle_teamswitch_no']
  },
  oracle_werewolfteam: {
    yes: ['oracle_werewolfteam_yes', 'oracle_teamswitch_yes'],
    no: ['oracle_teamswitch_no']
  },
  oracle_vampireteam: {
    yes: ['oracle_vampireteam_yes', 'oracle_teamswitch_yes'],
    no: ['oracle_teamswitch_no']
  },
  oracle_alienexchange: {
    yes: ['oracle_alienexchange_yes'],
    no: ['oracle_alienexchange_no']
  },
  oracle_centerexchange: {
    yes: ['oracle_centerexchange_yes', 'oracle_centerexchange_yes2'],
    no: ['oracle_teamswitch_no']
  },
  oracle_viewcenter: {
    yes: ['oracle_view_yes1', 'oracle_view_yes2', 'oracle_view_yes3'],
    no: ['oracle_ripple_no']
  },
  oracle_ripple: {
    yes: ['oracle_ripple_yes'],
    no: ['oracle_ripple_no']
  },
  oracle_viewplayer: {
    yes: ['oracle_viewplayer_result'],
    no: ['oracle_viewplayer_result2']
  }
}
