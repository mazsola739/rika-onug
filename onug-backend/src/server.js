const express = require("express");
const { createEventFromRequest } = require("./util/express-lambda-converter");
const { joinRoomController } = require("./lambda/api/join-room/handler");
const { leaveRoomController } = require("./lambda/api/leave-room/handler");
const { actionController } = require("./lambda/action/handler");
const { hydrateController } = require("./lambda/api/hydrate/handler");
const { hydrateSelectController } = require("./lambda/api/hydrate-select/handler");
const { updateSelectController } = require("./lambda/api/update-select/handler");
const { readyController } = require("./lambda/api/ready/handler");
const { roomsController } = require("./lambda/api/rooms/handler");
const { errorController } = require("./lambda/api/error/handler");

const app = express();
const PORT = 7654;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/", async (req, res) => {
  const { body } = req;
  const { route } = body;

  let response;
  switch (route) {
    case "join-room":
      response = await joinRoomController(createEventFromRequest(body), res);
      break;
    case "leave-room":
      response = await leaveRoomController(createEventFromRequest(body));
      break;
    case "action":
      response = await actionController(createEventFromRequest(body));
      break;
    case "hydrate":
      response = await hydrateController(createEventFromRequest(body));
      break;
    case "hydrate-select":
      response = await hydrateSelectController(createEventFromRequest(body));
      break;
    case "update-select":
      response = await updateSelectController(createEventFromRequest(body));
      break;
    case "ready":
      response = await readyController(createEventFromRequest(body));
      break;
    case "rooms":
      response = await roomsController(createEventFromRequest(body));
      break;
    default:
      response = errorController(createEventFromRequest(body));
      break;
  }

  res.status(response.statusCode).send(JSON.stringify(response.body));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
