const { joinRoomController } = require("../join-room/handler");
const { actionController } = require("../action/handler");
const { hydrateController } = require("../hydrate/handler");
const { readyController } = require("../ready/handler");
const { hydrateSelectController } = require("../hydrate-select/handler");
const { updateSelectController } = require("../update-select/handler");
const { roomsController } = require("../update-select/handler");

exports.handler = async (event, context, cb) => {
  const {
    body: { route },
  } = event;

  if (route === "join-room")           return joinRoomController(event, context, cb);
  else if (route === "action")         return actionController(event, context, cb);
  else if (route === "hydrate")        return hydrateController(event, context, cb);
  else if (route === "hydrate-select") return hydrateSelectController(event, context, cb);
  else if (route === "update-select")  return updateSelectController(event, context, cb);
  else if (route === "ready")          return readyController(event, context, cb);
  else if (route === "rooms")          return roomsController(event, context, cb);

  return;
};
