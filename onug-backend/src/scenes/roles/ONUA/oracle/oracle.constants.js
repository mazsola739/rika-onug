export const randomOracleQuestions = [
  'oracle_alienteam_text',
  'oracle_werewolfteam_text',
  'oracle_vampireteam_text',
  'oracle_alienexchange_text',
  'oracle_centerexchange_text',
  'oracle_viewcenter_text',
  'oracle_ripple_text',
  'oracle_viewplayer_text',
  'oracle_evenodd_text',
  'oracle_guessnumber_text'
]

export const oracleResponses = {
  oracle_alienteam_text: {
    yes: ['oracle_alienteam_yes_text', 'oracle_alienteam_yes2_text', 'oracle_teamswitch_yes_text'],
    no: ['oracle_teamswitch_no_text']
  },
  oracle_werewolfteam_text: {
    yes: ['oracle_werewolfteam_yes_text', 'oracle_teamswitch_yes_text'],
    no: ['oracle_teamswitch_no_text']
  },
  oracle_vampireteam_text: {
    yes: ['oracle_vampireteam_yes_text', 'oracle_teamswitch_yes_text'],
    no: ['oracle_teamswitch_no_text']
  },
  oracle_alienexchange_text: {
    yes: ['oracle_alienexchange_yes_text'],
    no: ['oracle_alienexchange_no_text']
  },
  oracle_centerexchange_text: {
    yes: ['oracle_centerexchange_yes_text', 'oracle_centerexchange_yes2_text'],
    no: ['oracle_teamswitch_no_text']
  },
  oracle_viewcenter_text: {
    yes: ['oracle_view_yes1_text', 'oracle_view_yes2_text', 'oracle_view_yes3_text'],
    no: ['oracle_ripple_no_text']
  },
  oracle_ripple_text: {
    yes: ['oracle_ripple_yes_text'],
    no: ['oracle_ripple_no_text']
  },
  oracle_viewplayer_text: {
    yes: ['oracle_viewplayer_result_text'],
    no: ['oracle_viewplayer_result2_text']
  }
}
