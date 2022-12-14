const discovery = require('./app/discovery');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');
const repl = require('repl');

const {
  PORT = 80,
  DISCOVERY_PORT = 1889
} = process.env;

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
  r.context.reqire = require;
}
