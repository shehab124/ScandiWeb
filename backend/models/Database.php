<?php

class Database
{
    private $conn;

    public function __construct()
    {
        $this->conn = require_once 'config/DBConfig.php';
    }

    public function getConnection()
    {
        return $this->conn;
    }
}
