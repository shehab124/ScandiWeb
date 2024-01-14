<?php

require_once "Autoloader.php";

class ProductModel
{
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function getProducts()
    {
        $conn = $this->db->getConnection();

        $query = "SELECT * FROM products";

        $result = $conn->query($query);

        if (!$result) {
            return json_encode([]);
        }

        $products = $result->fetch_all(MYSQLI_ASSOC);

        $result->free_result();

        // Filter out null values from each product in the array
        $filteredProducts = array_map(function ($product) {
            return array_filter($product, function ($value) {
                return $value !== null;
            });
        }, $products);

        return $filteredProducts;
    }
}
