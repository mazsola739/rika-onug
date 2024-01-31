const roomsData = require("../data/rooms.json")
const { logTrace, logError } = require("../log")

exports.rooms = (req, res) => {
  logTrace("Rooms endpoint called")

  try {
    return res.send({
      message: "Successfully fetched",
      data: roomsData,
    })
  } catch (error) {
    logError("Error fetching rooms:", error)
    return res.send({
      message: "Failed to fetch rooms",
    })
  }
}
