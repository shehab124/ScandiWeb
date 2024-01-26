<?php

class Database
{
    private $conn;

    public function __construct()
    {
        define('DB_HOST', 'localhost');
        define('DB_USER', 'chehab');
        define('DB_PASSWORD', 'admin');
        define('DB_NAME', 'scandiweb');

        $this->conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function getConnection()
    {
        return $this->conn;
    }
}
