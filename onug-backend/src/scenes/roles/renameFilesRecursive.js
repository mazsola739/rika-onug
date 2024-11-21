const fs = require('fs');
const path = require('path');

const renameFilesRecursive = (directoryPath) => {
    fs.readdir(directoryPath, { withFileTypes: true }, (err, entries) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        entries.forEach((entry) => {
            const fullPath = path.join(directoryPath, entry.name);

            if (entry.isDirectory()) {
                // Recursively process the subdirectory
                renameFilesRecursive(fullPath);
            } else if (entry.isFile()) {
                const newFileName = entry.name.replace('interaction', 'action');
                if (newFileName !== entry.name) {
                    const newPath = path.join(directoryPath, newFileName);
                    fs.rename(fullPath, newPath, (err) => {
                        if (err) {
                            console.error(`Error renaming file ${entry.name}:`, err);
                        } else {
                            console.log(`Renamed: ${entry.name} -> ${newFileName}`);
                        }
                    });
                }
            }
        });
    });
};

// Set the root directory for the operation
const rootDirectory = './'; // Replace with your root directory
renameFilesRecursive(rootDirectory);
