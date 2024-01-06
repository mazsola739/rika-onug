const express = require("express");
const { createEventFromRequest } = require("./util/express-lambda-converter");
const { joinRoomController } = require("./lambda/api/join-room/handler");
const { actionController } = require("./lambda/action/handler");
const { hydrateController } = require("./lambda/api/hydrate/handler");
const { readyController } = require("./lambda/api/ready/handler");
const { errorController } = require("./lambda/api/error/handler");
const { hydrateSelectController } = require("./lambda/api/hydrate-select/handler");
const { updateSelectController } = require("./lambda/api/update-select/handler");
const { roomsController } = require("./lambda/api/rooms/handler");
const { leaveRoomController } = require("./lambda/api/leave-room/handler");

const app = express();
const PORT = 7654;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/", async (req, res) => {
  const { body } = req;
  const { route } = body;

  let response;
  if (route === "join-room")
    response = await joinRoomController(createEventFromRequest(body));
  else if (route === "leave-room")
    response = await leaveRoomController(createEventFromRequest(body));
  else if (route === "action")
    response = await actionController(createEventFromRequest(body));
  else if (route === "hydrate")
    response = await hydrateController(createEventFromRequest(body));
  else if (route === "hydrate-select")
    response = await hydrateSelectController(createEventFromRequest(body));
  else if (route === "update-select")
    response = await updateSelectController(createEventFromRequest(body));
  else if (route === "ready")
    response = await readyController(createEventFromRequest(body));
  else if (route === "rooms")
    response = await roomsController(createEventFromRequest(body));
  else response = errorController(createEventFromRequest(body));

  res.status(response.statusCode);
  res.send(JSON.stringify(response.body));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
