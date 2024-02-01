const roomsData = require("../data/rooms.json")
const {logTrace, logErrorwithStack} = require("../log")

exports.rooms = (req, res) => {
  try {
    logTrace("Rooms endpoint called")
    return res.send({
      message: "Successfully fetched",
      data: roomsData,
    })
  } catch (error) {
    logErrorwithStack(error)
    return res.send({
      message: "Failed to fetch rooms",
    })
  }
}
