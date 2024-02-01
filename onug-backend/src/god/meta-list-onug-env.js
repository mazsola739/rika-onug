const { logTrace } = require("../log")

exports.metaListOnugEnv = async (req, res) => {
  logTrace(`GOD list onug environments endpoint triggered`)
  const onugEnvsArray = Object.entries(process.env).filter(([key]) => key.includes("ONUG_"))
  const onugEnvs = {}
  onugEnvsArray.forEach(([key, value]) => {
    onugEnvs[key] = value
  })

  return res.send(onugEnvs)
}
