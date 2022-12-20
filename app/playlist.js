const discoveries = require('./discovery').discoveries;
const persistence = require('./persistence');

const PlaylistState = {
  RUNNING: 'running',
  STOPPED: 'stopped'
};

let playlistInterval = null;

module.exports.PlaylistState = PlaylistState;

// Begins coordination of playlist state on discovered Pixelblaze controllers
module.exports.start = function () {
  const state = persistence.read();
  // TODO [bosgood] Read pattern duration from state
  const patternDuration = 5000;
  setInterval(syncPlaylist, patternDuration);
};

// Halts playlist execution
module.exports.stop = function () {
  // Stop firing playlist commands
  if (playlistInterval) {
    clearInterval(playlistInterval);
    playlistInterval = null;
  }

  // Persist the application state
  const state = persistence.read();
  if (state.playlist && state.playlist.state !== PlaylistState.STOPPED) {
    state.playlist.state = PlaylistState.STOPPED;
    persistence.save(state);
  }
};

// Coordinates pattern execution on known Pixelblazes according to playlist state
function syncPlaylist() {
  // TODO [bosgood] Implement playlist coordination by sending programName commands

  // const state = persistence.read();
  //
  // let controller = discoveries[id] && discoveries[id].controller;
  // if (controller) {
  //   controller.setCommand(req.body.command);
  // }
}
