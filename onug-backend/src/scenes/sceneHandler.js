import { END_GAME } from "../constants";
import { logTrace } from "../log";
import { upsertRoomState } from "../repository";
import { allPlayersStateCheck } from "../utils";
import { broadcast } from "../websocket";
import { actionHandler } from "./actionHandler";
import { isActivePlayer } from "./activePlayer";

export const sceneHandler = async (gamestate) => {
  logTrace(`sceneHandler in room [${gamestate.room_id}]`);

  const playersArray = Object.values(gamestate.players);
  let newGamestate = { ...gamestate, actual_scenes: [] };

  let flagsState = {
    player_card_shifting: false,
    center_card_shifting: false,
    mark_shifting: false,
    shield: false,
    artifact: false,
    view_player_card: false,
    view_center_card: false
  };

  const activePlayersInScenes = new Set();

  const hasConflict = (scene) => {
    const {
      player_card_shifting,
      center_card_shifting,
      mark_shifting,
      shield,
      artifact,
      view_player_card,
      view_center_card
    } = scene;

    if (flagsState.artifact || flagsState.shield) {
      logTrace(`Conflict due to active artifact or shield flag, halting scene processing.`);
      return true;
    }

    return (
      (player_card_shifting && flagsState.player_card_shifting) ||
      (center_card_shifting && flagsState.center_card_shifting) ||
      (mark_shifting && flagsState.mark_shifting) ||
      (shield && flagsState.shield) ||
      (artifact && flagsState.artifact) ||
      (view_center_card && flagsState.center_card_shifting) ||
      (center_card_shifting && flagsState.view_center_card) ||
      (view_player_card && flagsState.player_card_shifting) ||
      (player_card_shifting && flagsState.view_player_card)
    );
  };

  for (const scene of newGamestate.scripts) {
    logTrace(`Evaluating scene: ${scene.scene_title}`);

    // Find players active in this scene
    const scenePlayers = playersArray.filter((player) =>
      isActivePlayer(player.card)[scene.scene_title]
    );
    logTrace(`scenePlayers: ${JSON.stringify(scenePlayers)}`);
    // Check if any of the players in this scene are already in active scenes
    const overlapExists = scenePlayers.some((player) =>
      activePlayersInScenes.has(player.player_number)
    );
    logTrace(`overlapExists: ${JSON.stringify(overlapExists)}`);

    if (overlapExists) {
      logTrace(`Overlap detected with scene: ${scene.scene_title}. Stopping further processing.`);
      break;  // Exit the loop if an overlap is detected
    }

    // Stop if a conflict is detected
    if (hasConflict(scene)) {
      logTrace(`Flag conflict detected in scene: ${scene.scene_title}. Stopping further processing.`);
      break;  // Exit the loop if a flag conflict is detected
    }

    if (scenePlayers.length > 0) {
      // Add scene if no conflicts or overlaps
      newGamestate.actual_scenes.push({
        scene_title: scene.scene_title,
        scene_number: scene.scene_number
      });
      logTrace(`Scene added: ${scene.scene_title}`);

      // Track players added in this scene
      scenePlayers.forEach((player) =>
        activePlayersInScenes.add(player.player_number)
      );

      // Update flags based on the current scene
      flagsState = { ...flagsState, ...scene };
    } else {
      // Add scene without flags if no active player is involved
      newGamestate.actual_scenes.push({
        scene_title: scene.scene_title,
        scene_number: scene.scene_number
      });
      logTrace(`No active player for scene: ${scene.scene_title}, added without updating flags.`);
    }
  }

  // Filter out processed scenes from scripts
  newGamestate.scripts = newGamestate.scripts.filter(
    (scene) =>
      !newGamestate.actual_scenes.some(
        (actualScene) => actualScene.scene_title === scene.scene_title
      )
  );
  logTrace(`Remaining scripts after filtering: ${JSON.stringify(newGamestate.scripts)}`);

  // Process each action in the added scenes
  for (const actualScene of newGamestate.actual_scenes) {
    logTrace(`Processing action for scene: ${actualScene.scene_title}`);
    newGamestate = await actionHandler(newGamestate, actualScene.scene_title);
  }

  // Determine if the game should end
  const allActionsComplete = newGamestate.scripts.length === 0;
  const noPendingPlayerActions = allPlayersStateCheck(playersArray, 'action_finished');
  const gameCanEnd = allActionsComplete && noPendingPlayerActions;

  if (gameCanEnd) {
    logTrace(`All scripts processed. Broadcasting END_GAME message.`);
    broadcast(newGamestate.room_id, {
      type: END_GAME,
      success: true,
      day_mode: true,
      night_mode: false,
      message: 'Successfully finished the game'
    });
  }

  await upsertRoomState(newGamestate);
  return newGamestate;
};
