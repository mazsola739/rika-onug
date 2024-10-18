import { readdir, unlink } from 'fs/promises'
import { logTrace, logErrorWithStack } from '../../log'

export const metaDeleteAllOldLogFiles = async (req, res) => {
  try {
    logTrace(`GOD delete all old log files endpoint triggered`)

    const allFilesInLogDir = await readdir(`${__dirname}/../../logs/`, {
      withFileTypes: true,
    })

    const logFiles = allFilesInLogDir
      .filter((item) => !item.isDirectory() && item.name !== 'placeholder.md')
      .map((item) => `${item.path}${item.name}`)
    logFiles.pop()

    logTrace(`META DELETE ALL:  ${JSON.stringify(logFiles)}`)
    logFiles.forEach(async (filePath) => await unlink(filePath))

    return res.send({ message: 'done', logFiles })
  } catch (error) {
    logErrorWithStack(error)
  }
}
