const Database = require('./database');

const db = new Database('localhost', 8000, 'password');

// Get the value associated with key 'mykey'

db.get('mykey').then(console.log);

// Set the value of key 'mykey' to 'myvalue'

db.set('mykey', 'myvalue').then(console.log);

// Delete the key 'mykey'

db.delete('mykey').then(console.log)
