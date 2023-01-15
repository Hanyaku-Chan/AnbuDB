<?php
class Database {
    private $host;
    private $port;
    private $socket;
    private $password;

    public function __construct($host, $port, $password) {
        $this->host = $host;

        $this->port = $port;
    
        $this->password = $password;
    
        $this->connect();
    }

    public function connect() {
        $this->socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);

        socket_connect($this->socket, $this->host, $this->port);
    }

    public function get($key) {
        socket_write($this->socket, $this->password . ":GET:" . $key, strlen($this->password . ":GET:" . $key));

        $response = socket_read($this->socket, 2048);
        return $response;
    }

    public function set($key, $value) {
        socket_write($this->socket, $this->password . ":SET:" . $key . ":" . $value, strlen($this->password . ":SET:" . $key . ":" . $value));

        $response = socket_read($this->socket, 2048);
        return $response;
    }

    public function delete($key) {
        socket_write($this->socket, $this->password . ":DELETE:" . $key, strlen($this->password . ":DELETE:" . $key));

        $response = socket_read($this->socket, 2048);
        return $response;
    }

    public function __destruct() {
        socket_close($this->socket);
    }
}
