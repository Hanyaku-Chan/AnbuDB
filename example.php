<?php
require_once('anbu-library.php');

$database = new Database('localhost', 8000, 'password');

$response = $database->get('key');
$response = $database->set('key', 'value');
$response = $database->delete('key');

print($response);