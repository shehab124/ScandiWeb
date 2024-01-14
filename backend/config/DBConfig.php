<?php


define('DB_HOST', 'localhost');
define('DB_USER', 'chehab');
define('DB_PASSWORD', 'admin');
define('DB_NAME', 'scandiweb');

$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

return $conn;
