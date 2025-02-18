import { generateRoleAction } from '../../sceneUtils'

export const rippleAction = (gamestate, token, title) => {
/*   const randomRipple = gamestate.ripple.ripple_action

  switch (randomRipple) {
    case 'random_ripple_1minute':
      break
    case 'random_ripple_repeat':
      break
    case 'random_ripple_repeat1p':
      break
    case 'random_ripple_insomniac':
      break
    case 'random_ripple_nospeak':
      break
    case 'random_ripple_faceaway':
      break
    case 'random_ripple_troublemaker':
      break
    case 'random_ripple_steal':
      break
    case 'random_ripple_witch':
      break
    case 'random_ripple_view1':
      break
    case 'random_ripple_view2':
      break
    case 'random_ripple_reveal':
      break
    case 'random_ripple_dualview':
      break
    case 'random_ripple_twovote':
      break
    case 'random_ripple_shuffle':
      break
    case 'random_ripple_drunk':
      break
    case 'random_ripple_voteapp':
      break
    case 'random_ripple_repeatrole':
      break
    case 'random_ripple_iamalien':
      break
  }
 */
  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    scene_end: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['ripple_start'],
    scene_end: true
  })
}
