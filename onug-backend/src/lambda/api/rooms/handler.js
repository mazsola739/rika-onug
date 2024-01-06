const path = require("path");
const fs = require("fs");
const filePath = path.join(__dirname, "../../../data/rooms.json");
const {
  generateSuccessResponse,
  generateErrorResponse,
} = require("../../../util/response-generator");

const roomsController = (event) => {
  console.log(`Rooms endpoint triggered with event: ${JSON.stringify(event)}`);

  try {
    const roomsData = fs.readFileSync(filePath, "utf8");

    const parsedRoomsData = JSON.parse(roomsData);

    return generateSuccessResponse({
      message: "Successfully fetched",
      data: parsedRoomsData,
    });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return generateErrorResponse({
      message: "Failed to fetch rooms",
    });
  }
};

module.exports = {
  roomsController,
};
