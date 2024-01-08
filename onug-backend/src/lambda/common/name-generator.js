const randomPlayerName = (names = []) => {
  return names[~~(Math.random() * names.length)];
};

module.exports = {
  randomPlayerName,
};
