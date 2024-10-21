import { readdir, unlink } from 'fs/promises';
import { logTrace, logErrorWithStack } from '../../log';
import path from 'path';

export const metaDeleteAllOldLogFiles = async (req, res) => {
  try {
    logTrace('GOD delete all old log files endpoint triggered');

    const logDir = path.resolve(__dirname, '../../../logs');
    const allFilesInLogDir = await readdir(logDir, { withFileTypes: true });

    const logFiles = allFilesInLogDir
      .filter((item) => !item.isDirectory() && item.name !== 'placeholder.md')
      .map((item) => path.join(logDir, item.name));

    if (logFiles.length > 0) {
      logFiles.pop();
    }

    logTrace(`META DELETE ALL: ${JSON.stringify(logFiles)}`);

    await Promise.all(logFiles.map(async (filePath) => unlink(filePath)));

    return res.send({ message: 'done', logFiles });
  } catch (error) {
    logErrorWithStack(error);
    return res.status(500).send({ error: 'An error occurred while deleting log files.' });
  }
};
