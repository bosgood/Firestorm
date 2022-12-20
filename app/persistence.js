const fs = require('node:fs/promises');

let state = null;

// The filename used to store application state between restarts
module.exports.STATE_FILENAME = 'state.json';

// Returns the current application state
module.exports.read = function () {
  return { ... state };
}

// Read any existing application state from disk
module.exports.load = async function () {
  const data = await fs.readFile(module.exports.STATE_FILENAME);
  // TODO [bosgood] Handle file not found by setting an empty state
  const newState = JSON.parse(data);
  state = newState;
  return state;
};

// Write a new application state and save to disk
module.exports.save = async function (newState) {
  state = newState;
  const serialized = JSON.stringify(state, null, 2);
  return await fs.writeFile(module.exports.STATE_FILENAME, serialized);
};
