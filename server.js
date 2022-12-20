const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const repl = require('repl');

const app = express();
const discovery = require('./app/discovery');
const persistence = require('./app/persistence');

const {
  PORT = 80,
  DISCOVERY_PORT = 1889,
  STATE_FILENAME
} = process.env;

if (STATE_FILENAME) {
  persistence.STATE_FILENAME = STATE_FILENAME;
}

discovery.start({
  host: '0.0.0.0',
  port: DISCOVERY_PORT
});

app.use(bodyParser.json());
require("./app/api")(app);
app.use(compression());
app.use(express.static('build'));

console.log('listening on %s', PORT);
app.listen(PORT);

if (process.stdout.isTTY) {
  const r = repl.start('> ');
  r.on('exit', () => {
    console.log('Received "exit" event from repl!');
    process.exit();
  });
  r.context.discoveries = discovery.discoveries;
  r.context.persistence = persistence;
  r.context.require = require;
}
