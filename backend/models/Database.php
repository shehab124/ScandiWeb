<?php

class Database
{
    private $conn;

    public function __construct()
    {
        define('DB_HOST', 'localhost');
        define('DB_USER', 'u726756365_chehab');
        define('DB_PASSWORD', 'Jars_Summer2023');
        define('DB_NAME', 'u726756365_scandiweb');

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
