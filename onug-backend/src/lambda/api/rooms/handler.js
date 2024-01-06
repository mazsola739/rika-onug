const roomsData = require("../../../data/rooms.json");
const {
  generateSuccessResponse,
  generateErrorResponse,
} = require("../../../util/response-generator");

const roomsController = (event) => {
  console.log(`Rooms endpoint triggered with event: ${JSON.stringify(event)}`);

  try {
    return generateSuccessResponse({
      message: "Successfully fetched",
      data: roomsData,
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
