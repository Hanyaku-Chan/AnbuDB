const net = require('net');

class Database {

  constructor(host, port, password) {

    this.host = host;

    this.port = port;

    this.password = password;

  }

  _send(message) {

    return new Promise((resolve, reject) => {

      const client = net.createConnection({ host: this.host, port: this.port }, () => {

        client.write(`${this.password}:${message}`);

      });

  

      let data = '';

  

      client.on('data', (chunk) => {

        data += chunk;

      });

  

      client.on('end', () => {

        resolve(JSON.parse(data));

      });

  

      client.on('error', (err) => {

        reject(err);

      });

    });

  }

  async get(key) {

    const result = await this._send(`GET:${key}`);

    return result;

  }

  async set(key, value) {

    const result = await this._send(`POST:${key}:${value}`);

    return result;

  }

  async delete(key) {

    const result = await this._send(`DELETE:${key}`);

    return result;

  }

}

module.exports = Database;
