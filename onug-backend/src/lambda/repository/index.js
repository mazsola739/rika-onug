const repositoryType = process.env.REPOSITORY_TYPE || "local";
const repositoryPath = `../repository/${repositoryType}-repository`;
console.log(`repositoryPath: ${repositoryPath}`);
const repository = require(repositoryPath);

module.exports = {
    repository,
  };