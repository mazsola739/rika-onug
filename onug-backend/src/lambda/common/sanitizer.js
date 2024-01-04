const truncate = (string) =>
  string.length > 25 ? string.slice(0, 25) : string;
const sanitize = (string) => truncate(string.replace(/[^a-z0-9\s]/gi, ""));

module.exports = {
  sanitize,
};
