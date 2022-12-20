const fs = require('node:fs/promises');

let state = {};

// The filename used to store application state between restarts
module.exports.STATE_FILENAME = 'state.json';

// Read any existing application state from disk
module.exports.load = async function () {
  const data = await fs.readFile(module.exports.STATE_FILENAME);
  const newState = JSON.parse(data);
  state = newState;
  return state;
};

// Save the application state to disk
module.exports.save = async function (newState) {
  state = newState;
  const serialized = JSON.stringify(state, null, 2);
  return await fs.writeFile(module.exports.STATE_FILENAME, serialized);
};
