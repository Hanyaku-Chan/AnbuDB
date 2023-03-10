const net = require('net');
const fs = require('fs');

let database = {};
let password = 'password';

const save = () => {
  fs.writeFileSync('database.json', JSON.stringify(database));
};

const load = () => {
  try {
    database = JSON.parse(fs.readFileSync('database.json'));
  } catch (e) {
    console.log(e);
  }
};

const get = (key) => {
  console.log("Get key: " + key);
  return database[key];
};

const set = (key, value) => {
  database[key] = value;
  console.log("Set key: " + key + " to value: " + value);
  save();
};

const remove = (key) => {
  delete database[key];
  console.log("Removed key: " + key);
  save();
};

load();

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const message = data.toString().trim();
    const [auth, method, key, value] = message.split(':');
    if (auth !== password) {
        socket.write(JSON.stringify({ error: 'Invalid password' }));
        socket.end();
        return;
    }

    switch (method) {
      case 'GET':
        socket.write(JSON.stringify(get(key)));
        break;
      case 'POST':
        set(key, value);
        socket.write(JSON.stringify({ success: true }));
        break;
      case 'DELETE':
        remove(key);
        socket.write(JSON.stringify({ success: true }));
        break;
      default:
        socket.write(JSON.stringify({ error: 'Invalid request method' }));
    }
    socket.end();
  });
});

server.listen(8000, () => {
  console.log('Server listening on port 8000');
});
