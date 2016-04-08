var restify = require('restify');
var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./db.db');

var server = restify.createServer({
  name: 'table-football',
  version: '0.1.0'
});
server.use(restify.bodyParser());

server.get('/users', function (req, res, next) {
  db.all('SELECT * FROM user', function (err, rows) {
    res.json(rows);
  });
  return next();
});

server.get('/matches', function (req, res, next) {
  db.all('SELECT * FROM match', function (err, rows) {
    res.json(rows);
  });
  return next();
});

server.listen(3002, function () {
  console.log('Listening on port 3002');
});

process.on('SIGINT', function () {
  db.close();
  console.log('Closed DB, exiting process');
  process.exit();
});
