# TCP JSON Database

This is a simple TCP server that stores key-value pairs in a JSON file and a library that connects to the server and allows to perform GET, POST and DELETE operations.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have Node.js and npm (Node Package Manager) installed on your machine.

### Installing

Clone the repository and install the dependencies by running the following command in the project directory:

```bash
npm install
```

### Running the Server

To start the server, run the following command in the project directory:

```bash
node anbu.js
```


The server will listen on port 8000 by default and it will create a database.json file in the root directory.

### Using the Library

You can use the library by importing it in your code and instantiating a new object of the `Database` class. The class constructor takes 3 arguments: host, port and password. The host and port are used to connect to the server, and the password is used to authenticate with the server. Once you have an instance of the class, you can call the `get`, `set`, and `delete` methods on it to perform the corresponding operations on the server.

Here's an example of how you can use the library:
```javascript
const Database = require('./database');
const db = new Database('localhost', 8000, 'password');

// Get the value associated with key 'mykey'
db.get('mykey').then(console.log);

// Set the value of key 'mykey' to 'myvalue'
db.set('mykey', 'myvalue').then(console.log);

// Delete the key 'mykey'
db.delete('mykey').then(console.log);
```

The library makes use of Promises, so you can use the .then() method to handle the result of the operations.

### Security
The password is sent in plaintext, it is recommended to use a secure transport protocol like HTTPS or a secure communication library like SSH.

### License
This project is licensed under the GNU AGPL 3 License - see the LICENSE file for details.
