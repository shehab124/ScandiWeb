<?php

require_once "Autoloader.php";

abstract class Product
{
    private $_sku;
    private $_price;
    private $_type;

    public function __construct($sku, $price, $type)
    {
        $this->_sku = $sku;
        $this->_price = $price;
        $this->_type = $type;
    }

    public function getSku()
    {
        return $this->_sku;
    }

    public function setSku($sku)
    {
        $this->_sku = $sku;
    }

    public function getPrice()
    {
        return $this->_price;
    }

    public function setPrice($price)
    {
        $this->_price = $price;
    }

    public function getType()
    {
        return $this->_type;
    }

    public function setType($type)
    {
        $this->_type = $type;
    }

    public static function getProducts()
    {
        $db = new Database();

        $conn = $db->getConnection();

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

    abstract public function addProduct();

    public static function deleteProductsBySku(array $skuArray)
    {
        $db = new Database();
        $conn = $db->getConnection();

        // Sanitize the SKU values (assuming they are strings)
        $sanitizedSkus = array_map(function ($sku) use ($conn) {
            return $conn->real_escape_string($sku);
        }, $skuArray);

        // Prepare the DELETE query with an IN clause
        $placeholders = implode(',', array_fill(0, count($sanitizedSkus), '?'));
        $query = "DELETE FROM products WHERE sku IN ($placeholders)";

        // Create a prepared statement
        $stmt = $conn->prepare($query);

        // Bind parameters
        $types = str_repeat('s', count($sanitizedSkus));
        $stmt->bind_param($types, ...$sanitizedSkus);

        $result = $stmt->execute();

        if ($result) {
            echo "Products deleted successfully!";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
        $conn->close();
    }
}
