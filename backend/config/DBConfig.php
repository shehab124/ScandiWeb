<?php


define('DB_HOST', 'localhost');
define('DB_USER', 'id21819459_chehab');
define('DB_PASSWORD', '@Dmin123');
define('DB_NAME', 'id21819459_scandiweb');

$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

return $conn;
